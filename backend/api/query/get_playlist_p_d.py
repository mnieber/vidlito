import graphene

from api.types import *
from playlists.models import PlaylistPD


class GetPlaylistPDOutputs(graphene.ObjectType):
    playlist_p_d = graphene.Field(PlaylistPDT)


class GetPlaylistPD:
    get_playlist_p_d = graphene.Field(
        GetPlaylistPDOutputs,
        playlist_slug=graphene.String(),
    )

    def resolve_get_playlist_p_d(self, info, playlist_slug):
        __import__("pudb").set_trace()  # zz
        playlist_p_d = PlaylistPD.objects.filter(
            owner__user_id=info.context.user.id, playlist__slug=playlist_slug
        ).first()
        return GetPlaylistPDOutputs(
            playlist_p_d=playlist_p_d,
        )
