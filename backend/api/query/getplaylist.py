import graphene
from api.query.getactions import parse_slug_id
from api.types import *
from playlists.models import Playlist


class GetPlaylistOutputs(graphene.ObjectType):
    playlist = graphene.Field(PlaylistT)


class GetPlaylist:
    get_playlist = graphene.Field(
        GetPlaylistOutputs,
        playlist_slug_id=graphene.String(),
    )

    def resolve_get_playlist(self, info, playlist_slug_id=None):
        slug, id = parse_slug_id(playlist_slug_id)
        if id:
            return GetPlaylistOutputs(playlist=Playlist.objects.get(id=id))

        return GetPlaylistOutputs(playlist=Playlist.objects.get(slug=slug))
