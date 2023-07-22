import graphene
from graphene.types.generic import GenericScalar

from api.types import *
from app.utils.ids import sort_items
from user_profiles.models import UserProfile


class SavePlaylistOrdering(graphene.Mutation):
    success = graphene.Boolean()
    errors = GenericScalar()

    class Arguments:
        playlist_ids = graphene.List(graphene.UUID, required=True)
        folder_id = graphene.UUID()

    def mutate(self, info, playlist_ids, folder_id):
        user_profile = UserProfile.get_mine(info)
        sort_items(user_profile.follow_set.all(), playlist_ids, lambda x: x.playlist_id)

        return SavePlaylistOrdering(
            success=True,
            errors={},
        )
