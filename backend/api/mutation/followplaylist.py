import graphene
from graphene.types.generic import GenericScalar

from api.types import *
from playlists.models import Follow
from user_profiles.models import UserProfile


class FollowPlaylist(graphene.Mutation):
    success = graphene.Boolean()
    errors = GenericScalar()

    class Arguments:
        playlist_id = graphene.String()
        is_following = graphene.Boolean()

    def mutate(self, info, playlist_id, is_following):
        user_profile = UserProfile.get(info)
        if is_following:
            Follow.objects.update_or_create(
                defaults=dict(),
                user_profile_id=user_profile.id,
                playlist_id=playlist_id,
            )
        else:
            Follow.objects.filter(
                user_profile_id=user_profile.id, playlist_id=playlist_id
            ).delete()

        return FollowPlaylist(success=True, errors={})
