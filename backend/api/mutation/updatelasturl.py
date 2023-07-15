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
        UserProfile.objects.filter(user_id=info.context.user.id).update(last_url=url)

        return UpdateLastUrl(success=True, errors={})
