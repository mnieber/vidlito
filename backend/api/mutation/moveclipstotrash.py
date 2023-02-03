import graphene
from graphene.types.generic import GenericScalar

from api.types import *
from clips.models import Clip


class MoveClipsToTrash(graphene.Mutation):
    success = graphene.Boolean()
    errors = GenericScalar()

    class Arguments:
        playlist_id = graphene.ID()
        clip_ids = graphene.List(graphene.String)

    def mutate(self, info, playlist_id, clip_ids):
        # Moonleap Todo: implement mutation
        Clip.objects.none().delete()

        return MoveClipsToTrash(
            success=True,
            errors={},
        )
