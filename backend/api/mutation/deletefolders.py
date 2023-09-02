import graphene
from graphene.types.generic import GenericScalar

from api.types import *


class DeleteFolders(graphene.Mutation):
    success = graphene.Boolean()
    errors = GenericScalar()

    class Arguments:
        folder_ids = graphene.List(graphene.UUID, required=True)

    def mutate(self, info, folder_ids):
        # Moonleap Todo: implement mutation

        return DeleteFolders(
            success=True,
            errors={},
        )
