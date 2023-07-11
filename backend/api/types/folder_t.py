from graphene_django.types import DjangoObjectType

from playlists.models import Folder


class FolderT(DjangoObjectType):
    class Meta:
        model = Folder
        exclude = [
            "sort_pos",
        ]
