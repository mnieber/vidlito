import graphene

from api.types import *
from playlists.models import Playlist


class GetPlaylistOutputs(graphene.ObjectType):
    playlist = graphene.Field(PlaylistT)


class GetPlaylist:
    get_playlist = graphene.Field(GetPlaylistOutputs, playlist_id=graphene.ID())

    def resolve_get_playlist(self, info, playlist_id):
        return GetPlaylistOutputs(playlist=Playlist.objects.get(id=playlist_id))
