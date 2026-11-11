import graphene
from graphene.types.generic import GenericScalar

from vidlito_be.api.types import *
from vidlito_be.clips.models import Clip


class DeleteClips(graphene.Mutation):
    success = graphene.Boolean()
    errors = GenericScalar()

    class Arguments:
        clip_ids = graphene.List(graphene.UUID, required=True)

    def mutate(self, info, clip_ids):
        Clip.objects.filter(id__in=clip_ids).delete()

        return DeleteClips(
            success=True,
            errors={},
        )
