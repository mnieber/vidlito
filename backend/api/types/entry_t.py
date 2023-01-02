from graphene_django.types import DjangoObjectType
from playlists.models import Entry


class EntryT(DjangoObjectType):
    class Meta:
        model = Entry
        exclude = [
            "sort_pos",
        ]
