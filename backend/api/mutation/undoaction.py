import graphene
from graphene.types.generic import GenericScalar

from api.types import *


class UndoAction(graphene.Mutation):
    success = graphene.Boolean()
    errors = GenericScalar()

    class Arguments:
        action_id = graphene.UUID(required=True)

    def mutate(self, info, action_id):
        __import__("pudb").set_trace()  # zz
        # Moonleap Todo: implement mutation

        return UndoAction(
            success=True,
            errors={},
        )
