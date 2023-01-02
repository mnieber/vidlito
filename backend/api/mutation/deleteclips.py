import graphene
from api.types import *
from clips.models import Clip
from graphene.types.generic import GenericScalar


class DeleteClips(graphene.Mutation):
    success = graphene.Boolean()
    errors = GenericScalar()

    class Arguments:
        clip_ids = graphene.List(graphene.String)

    def mutate(self, info, clip_ids):
        Clip.objects.filter(id__in=clip_ids).delete()

        return DeleteClips(
            success=True,
            errors={},
        )
