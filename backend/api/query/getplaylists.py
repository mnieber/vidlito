import graphene
from api.types import *
from playlists.models import Playlist


class GetPlaylistsOutputs(graphene.ObjectType):
    playlists = graphene.List(PlaylistT)


class GetPlaylists:
    get_playlists = graphene.Field(GetPlaylistsOutputs)

    def resolve_get_playlists(self, info):
        return GetPlaylistsOutputs(playlists=Playlist.objects.filter())
