import graphene
from graphene_django.types import DjangoObjectType

from vidlito_be.api.types.folder_t import FolderT  # noqa: F401
from vidlito_be.api.types.playlist_t import PlaylistT  # noqa: F401
from vidlito_be.user_profiles.models import UserProfile


class UserProfileT(DjangoObjectType):
    class Meta:
        model = UserProfile

    follow_set = graphene.List(PlaylistT)

    def resolve_follow_set(self, info):
        return [x.playlist for x in self.follow_set.all()]
