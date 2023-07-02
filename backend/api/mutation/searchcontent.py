import uuid

import graphene
from graphene.types.generic import GenericScalar

from api.types import *
from api.types.searchresult_t import SearchResultT
from clips.models import Clip


class SearchContent(graphene.Mutation):
    success = graphene.Boolean()
    errors = GenericScalar()
    search_results = graphene.List(SearchResultT)

    class Arguments:
        playlist_terms = graphene.List(graphene.String)
        playlist_tags = graphene.List(graphene.String)
        clip_terms = graphene.List(graphene.String)
        clip_tags = graphene.List(graphene.String)

    def mutate(
        self,
        info,
        playlist_terms=None,
        playlist_tags=None,
        clip_terms=None,
        clip_tags=None,
    ):
        search_results = []
        for clip in Clip.objects.all():
            playlist_slug = clip.source_playlist.slug if clip.source_playlist else None
            nr_of_clips = (
                clip.source_playlist.nr_of_clips if clip.source_playlist else None
            )

            search_results.append(
                SearchResultT(
                    id=uuid.uuid4().hex,
                    playlist_slug=playlist_slug,
                    clip_slug=clip.slug,
                    nr_of_clips=nr_of_clips,
                    owner_username=clip.owner.username,
                )
            )

        return SearchContent(success=True, errors={}, search_results=search_results)
