import graphene
from graphene.types.generic import GenericScalar

from api.types import *


class SavePlaylistOrdering(graphene.Mutation):
    success = graphene.Boolean()
    errors = GenericScalar()

    class Arguments:
        playlist_ids = graphene.List(graphene.UUID)

    def mutate(self, info, playlist_ids):
        # Moonleap Todo: implement mutation

        return SavePlaylistOrdering(
            success=True,
            errors={},
        )
