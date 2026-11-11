import uuid

from django.db.models import Q

from vidlito_be.api.types.searchresult_t import SearchResultT
from vidlito_be.playlists.models import Playlist, PlaylistPd
from vidlito_be.search.utils.join_clauses import join_clauses
from vidlito_be.user_profiles.models import UserProfile


def add_playlist_search_results(info, search_results, playlist_query):
    playlist_clauses = []
    for term in playlist_query["terms"] or []:
        playlist_clauses.append(Q(name__icontains=term))
    for tag in playlist_query["tags"] or []:
        playlist_clauses.append(Q(tags__tags__icontains=tag))

    for playlist in (
        Playlist.objects.filter(
            Q(is_public=True) | Q(owner_id=UserProfile.get_id(info))
        )
        .filter(join_clauses(playlist_clauses))
        .all()
        if playlist_clauses
        else []
    ):
        add_search_result_for_playlist(search_results, playlist)

    playlist_pd_clauses = []
    for tag in playlist_query["tags"] or []:
        playlist_pd_clauses.append(Q(tags__tags__icontains=tag))

    for playlist_pd in (
        PlaylistPd.filter_mine(info)
        .filter(join_clauses(playlist_pd_clauses))
        .all()
        .select_related("playlist")
        if playlist_pd_clauses
        else []
    ):
        if not [
            x for x in search_results if x.playlist_slug == playlist_pd.playlist.slug
        ]:
            add_search_result_for_playlist(search_results, playlist_pd.playlist)


def add_search_result_for_playlist(search_results, playlist):
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
