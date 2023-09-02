import graphene
from django.db import transaction
from graphene.types.generic import GenericScalar

from api.types import *
from playlists.models import Follow
from user_profiles.models import UserProfile


class FollowPlaylists(graphene.Mutation):
    success = graphene.Boolean()
    errors = GenericScalar()

    class Arguments:
        playlist_ids = graphene.List(graphene.UUID, required=True)
        is_following = graphene.Boolean(required=True)
        folder_id = graphene.UUID()

    def mutate(self, info, playlist_ids, is_following, folder_id=None):
        owner_id = UserProfile.get_id(info)
        with transaction.atomic():
            if is_following:
                for playlist_id in playlist_ids:
                    Follow.objects.update_or_create(
                        defaults=dict(),
                        owner_id=owner_id,
                        playlist_id=playlist_id,
                    )
            else:
                Follow.objects.filter(
                    owner_id=owner_id, playlist_id__in=playlist_ids
                ).delete()

        return FollowPlaylists(success=True, errors={})
