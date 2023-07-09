import graphene

from api.types import *
from playlists.models import Playlist


class GetPlaylistOutputs(graphene.ObjectType):
    playlist = graphene.Field(PlaylistT)


class GetPlaylist:
    get_playlist = graphene.Field(
        GetPlaylistOutputs,
        playlist_slug=graphene.String(required=False),
        playlist_id=graphene.UUID(required=False),
    )

    def resolve_get_playlist(self, info, playlist_id=None, playlist_slug=None):
        if playlist_id:
            return GetPlaylistOutputs(playlist=Playlist.objects.get(id=playlist_id))

        if playlist_slug:
            return GetPlaylistOutputs(playlist=Playlist.objects.get(slug=playlist_slug))

        raise Exception("Must provide either playlist_id or playlist_slug")
