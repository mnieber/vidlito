from graphene_django.types import DjangoObjectType

from playlists.models import PlaylistPD


class PlaylistPDT(DjangoObjectType):
    class Meta:
        model = PlaylistPD
