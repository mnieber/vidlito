import graphene
from django.db import transaction
from graphene.types.generic import GenericScalar

from api.types import *
from playlists.models import Follow
from user_profiles.models import UserProfile


class FollowPlaylist(graphene.Mutation):
    success = graphene.Boolean()
    errors = GenericScalar()

    class Arguments:
        playlist_ids = graphene.List(graphene.UUID, required=True)
        is_following = graphene.Boolean(required=True)
        folder_id = graphene.UUID()

    def mutate(self, info, playlist_ids, is_following, folder_id=None):
        user_profile = UserProfile.get_mine(info)
        with transaction.atomic():
            if is_following:
                for playlist_id in playlist_ids:
                    Follow.objects.update_or_create(
                        defaults=dict(),
                        user_profile_id=user_profile.id,
                        playlist_id=playlist_id,
                    )
            else:
                Follow.objects.filter(
                    user_profile_id=user_profile.id, playlist_id__in=playlist_ids
                ).delete()

        return FollowPlaylist(success=True, errors={})
