import graphene

from api.types import *
from playlists.models import Playlist, PlaylistPD


class GetPlaylistOutputs(graphene.ObjectType):
    playlist = graphene.Field(PlaylistT)
    playlist_p_d = graphene.Field(PlaylistPDT)


class GetPlaylist:
    get_playlist = graphene.Field(
        GetPlaylistOutputs,
        playlist_slug=graphene.String(required=False),
        playlist_id=graphene.UUID(required=False),
    )

    def resolve_get_playlist(self, info, playlist_id=None, playlist_slug=None):
        playlist = (
            Playlist.objects.get(id=playlist_id)
            if playlist_id
            else Playlist.objects.get(slug=playlist_slug)
            if playlist_slug
            else None
        )
        if not playlist:
            raise Exception("Must provide either playlist_id or playlist_slug")

        playlist_p_d = PlaylistPD.filter(info, playlist__slug=playlist.slug).first()

        return GetPlaylistOutputs(playlist=playlist, playlist_p_d=playlist_p_d)
