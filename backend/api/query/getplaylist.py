import graphene

from api.types import *
from playlists.models import Playlist


class GetPlaylistOutputs(graphene.ObjectType):
    playlist = graphene.Field(PlaylistT)


class GetPlaylist:
    get_playlist = graphene.Field(
        GetPlaylistOutputs,
        playlist_slug=graphene.String(required=True),
        playlist_id=graphene.UUID(),
    )

    def resolve_get_playlist(self, info, playlist_slug, playlist_id=None):
        if playlist_id:
            return GetPlaylistOutputs(playlist=Playlist.objects.get(id=playlist_id))

        return GetPlaylistOutputs(playlist=Playlist.objects.get(slug=playlist_slug))
