from graphene_django.types import DjangoObjectType

from vidlito_be.playlists.models import Entry


class EntryT(DjangoObjectType):
    class Meta:
        model = Entry
        exclude = [
            "sort_pos",
        ]
