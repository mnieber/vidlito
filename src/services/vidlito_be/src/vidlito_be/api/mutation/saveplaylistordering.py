import graphene
from graphene.types.generic import GenericScalar

from vidlito_be.api.types import *
from vidlito_be.app.utils.ids import sort_items
from vidlito_be.user_profiles.models import UserProfile


class SavePlaylistOrdering(graphene.Mutation):
    success = graphene.Boolean()
    errors = GenericScalar()

    class Arguments:
        playlist_ids = graphene.List(graphene.UUID, required=True)
        folder_id = graphene.UUID()

    def mutate(self, info, playlist_ids, folder_id=None):
        user_profile = UserProfile.get_mine(info)
        sort_items(user_profile.follow_set.all(), playlist_ids, lambda x: x.playlist_id)

        return SavePlaylistOrdering(
            success=True,
            errors={},
        )
