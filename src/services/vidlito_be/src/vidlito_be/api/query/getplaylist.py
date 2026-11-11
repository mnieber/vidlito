import graphene

from vidlito_be.api.types import *
from vidlito_be.playlists.models import Playlist, PlaylistPd


class GetPlaylistOutputs(graphene.ObjectType):
    playlist = graphene.Field(PlaylistT)
    playlist_pd = graphene.Field(PlaylistPdT)


class GetPlaylist:
    get_playlist = graphene.Field(
        GetPlaylistOutputs, playlist_slug=graphene.String(), playlist_id=graphene.UUID()
    )

    def resolve_get_playlist(self, info, playlist_slug=None, playlist_id=None):
        if not playlist_id and not playlist_slug:
            raise Exception("Must provide either playlist_id or playlist_slug")

        playlist = (
            Playlist.objects.filter(id=playlist_id).first()
            if playlist_id
            else Playlist.objects.filter(slug=playlist_slug).first()
            if playlist_slug
            else None
        )

        playlist_pd = (
            PlaylistPd.filter_mine(info, playlist__slug=playlist.slug).first()
            if playlist
            else None
        )

        return GetPlaylistOutputs(playlist=playlist, playlist_pd=playlist_pd)
