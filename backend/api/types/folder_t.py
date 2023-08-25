from graphene_django.types import DjangoObjectType

from playlists.models import Folder


class FolderT(DjangoObjectType):
    class Meta:
        model = Folder
        exclude = [
            "owner",
            "sort_pos",
        ]
