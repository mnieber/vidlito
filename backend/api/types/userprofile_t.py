from graphene_django.types import DjangoObjectType

from user_profiles.models import UserProfile


class UserProfileT(DjangoObjectType):
    class Meta:
        model = UserProfile
