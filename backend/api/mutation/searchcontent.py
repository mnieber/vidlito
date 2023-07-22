import uuid

import graphene
from django.db.models import Q
from graphene.types.generic import GenericScalar

from api.types import *
from api.types.searchresult_t import SearchResultT
from clips.models import Clip
from playlists.models import Playlist
from user_profiles.models import UserProfile


class SearchContent(graphene.Mutation):
    success = graphene.Boolean()
    errors = GenericScalar()
    search_results = graphene.List(SearchResultT)
    pagination = graphene.Field(PaginationT)

    class Arguments:
        page = graphene.Int()
        page_size = graphene.Int()
        playlist_terms = graphene.String()
        clip_terms = graphene.String()

    def mutate(
        self,
        info,
        page,
        page_size,
        playlist_terms=None,
        clip_terms=None,
    ):
        search_results = []
        clip_query = get_terms_and_tags(clip_terms)
        playlist_query = get_terms_and_tags(playlist_terms)

        has_terms = playlist_query["terms"] or clip_query["terms"]

        playlist_clauses = []
        for term in playlist_query["terms"] or []:
            playlist_clauses.append(Q(name__icontains=term))
        for tag in playlist_query["tags"] or []:
            playlist_clauses.append(Q(tags__contains=tag))

        for playlist in (
            Playlist.objects.filter(
                Q(is_public=True) | Q(owner_id=UserProfile.get_id(info))
            )
            .filter(join_clauses(playlist_clauses))
            .all()
            if playlist_clauses
            else []
        ):
            search_results.append(
                SearchResultT(
                    id=uuid.uuid4().hex,
                    playlist_slug=playlist.slug,
                    playlist_name=playlist.name,
                    clip_slug=None,
                    clip_name=None,
                    nr_of_clips=playlist.nr_of_clips,
                    owner_username=playlist.owner.username,
                )
            )

        clip_clauses = []
        for term in clip_query["terms"] or []:
            clip_clauses.append(Q(name__icontains=term))
        for tag in clip_query["tags"] or []:
            clip_clauses.append(Q(tags__contains=tag))

        for clip in (
            Clip.objects.filter(
                Q(nr_of_public_playlists__gt=0) | Q(owner_id=UserProfile.get_id(info))
            )
            .filter(join_clauses(clip_clauses))
            .all()
            if not has_terms or clip_clauses
            else []
        ):
            playlist_slug = clip.source_playlist.slug if clip.source_playlist else None
            playlist_name = clip.source_playlist.name if clip.source_playlist else None
            nr_of_clips = (
                clip.source_playlist.nr_of_clips if clip.source_playlist else None
            )

            search_results.append(
                SearchResultT(
                    id=uuid.uuid4().hex,
                    playlist_slug=playlist_slug,
                    playlist_name=playlist_name,
                    clip_slug=clip.slug,
                    clip_name=clip.name,
                    nr_of_clips=nr_of_clips,
                    owner_username=clip.owner.username,
                )
            )

        page_idx = page - 1
        start_idx = page_idx * page_size
        end_idx = start_idx + page_size
        page_results = search_results[start_idx:end_idx]

        return SearchContent(
            success=True,
            errors={},
            search_results=page_results,
            pagination=PaginationT(
                nr_of_items=len(search_results),
                page=page,
                page_size=page_size,
            ),
        )


def join_clauses(clauses):
    if len(clauses) == 0:
        return Q()
    result = clauses[0]
    for clause in clauses[1:]:
        result = result & clause
    return result


def get_terms_and_tags(input_string):
    words = [word.strip() for word in input_string.split(" ") if word.strip()]
    tags = [word[1:] for word in words if word.startswith("#")]
    terms = [word for word in words if not word.startswith("#")]
    return {"terms": terms, "tags": tags}
