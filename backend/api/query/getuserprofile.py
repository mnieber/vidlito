import graphene

from api.types import *
from user_profiles.models import UserProfile


class GetUserProfileOutputs(graphene.ObjectType):
    user_profile = graphene.Field(UserProfileT)


class GetUserProfile:
    get_user_profile = graphene.Field(GetUserProfileOutputs)

    def resolve_get_user_profile(self, info):
        if info.context.user.is_anonymous:
            return GetUserProfileOutputs(user_profile=None)

        return GetUserProfileOutputs(
            user_profile=UserProfile.objects.get(user_id=info.context.user.id)
        )
