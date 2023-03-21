import graphene
from graphene.types.generic import GenericScalar

from api.types import *


class UndoAction(graphene.Mutation):
    success = graphene.Boolean()
    errors = GenericScalar()

    class Arguments:
        playlist_id = graphene.UUID(required=True)

    def mutate(self, info, playlist_id):
        # Moonleap Todo: implement mutation

        return UndoAction(
            success=True,
            errors={},
        )
