import graphene
from graphene.types.generic import GenericScalar

from api.types import *
from user_profiles.models import UserProfile


class UpdateLastUrl(graphene.Mutation):
    success = graphene.Boolean()
    errors = GenericScalar()

    class Arguments:
        url = graphene.String()

    def mutate(self, info, url):
        UserProfile.filter(info).update(last_url=url)

        return UpdateLastUrl(success=True, errors={})
