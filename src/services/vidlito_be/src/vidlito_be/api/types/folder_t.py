from graphene_django.types import DjangoObjectType

from vidlito_be.playlists.models import Folder


class FolderT(DjangoObjectType):
    class Meta:
        model = Folder
        exclude = [
            "owner",
            "sort_pos",
        ]
