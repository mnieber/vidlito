import graphene
from graphene.types.generic import GenericScalar

from api.types import *
from clips.models import Clip


class DeleteClips(graphene.Mutation):
    success = graphene.Boolean()
    errors = GenericScalar()

    class Arguments:
        clip_ids = graphene.List(graphene.UUID)

    def mutate(self, info, clip_ids):
        Clip.objects.filter(id__in=clip_ids).delete()

        return DeleteClips(
            success=True,
            errors={},
        )
