import graphene
from api.types.entry_t import EntryT
from graphene_django.types import DjangoObjectType
from playlists.models import Entry, Playlist


class PlaylistT(DjangoObjectType):
    class Meta:
        model = Playlist
        exclude = [
            "sort_pos",
        ]
