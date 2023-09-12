import uuid

from django.db.models import Q

from api.types.searchresult_t import SearchResultT
from clips.models import Clip, ClipPd
from search.utils.join_clauses import join_clauses
from user_profiles.models import UserProfile


def add_clip_search_results(info, search_results, clip_query, has_terms):
    clip_clauses = []
    for term in clip_query["terms"] or []:
        clip_clauses.append(Q(name__icontains=term))
    for tag in clip_query["tags"] or []:
        clip_clauses.append(Q(tags__tags__icontains=tag))

    for clip in (
        Clip.objects.filter(
            Q(nr_of_public_playlists__gt=0) | Q(owner_id=UserProfile.get_id(info))
        )
        .filter(join_clauses(clip_clauses))
        .all()
        if not has_terms or clip_clauses
        else []
    ):
        add_search_result_for_clip(search_results, clip)

    clip_pd_clauses = []
    for tag in clip_query["tags"] or []:
        clip_pd_clauses.append(Q(tags__tags__icontains=tag))

    for clip_pd in (
        ClipPd.filter_mine(info)
        .filter(join_clauses(clip_pd_clauses))
        .all()
        .select_related("clip")
        if clip_pd_clauses
        else []
    ):
        if not [x for x in search_results if x.clip_slug == clip_pd.clip.slug]:
            add_search_result_for_clip(search_results, clip_pd.clip)


def add_search_result_for_clip(search_results, clip):
    playlist_slug = clip.source_playlist.slug if clip.source_playlist else None
    playlist_name = clip.source_playlist.name if clip.source_playlist else None
    nr_of_clips = clip.source_playlist.nr_of_clips if clip.source_playlist else None

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
