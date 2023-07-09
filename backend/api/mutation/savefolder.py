import graphene
from graphene.types.generic import GenericScalar

from api.types import *


class SaveFolder(graphene.Mutation):
    success = graphene.Boolean()
    errors = GenericScalar()

    class Arguments:
        folder_id = graphene.UUID(required=True)
        name = graphene.String(required=True)
        parent_folder_id = graphene.UUID(required=True)

    def mutate(self, info, folder_id, name, parent_folder_id):
        # Moonleap Todo: implement mutation

        return SaveFolder(
            success=True,
            errors={},
        )
