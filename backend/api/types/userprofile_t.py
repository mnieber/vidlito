import graphene
from graphene_django.types import DjangoObjectType

from api.types.playlist_t import PlaylistT
from user_profiles.models import UserProfile


class UserProfileT(DjangoObjectType):
    class Meta:
        model = UserProfile

    follow_set = graphene.List(PlaylistT)

    def resolve_follow_set(self, info):
        return [x.playlist for x in self.follow_set.all()]
