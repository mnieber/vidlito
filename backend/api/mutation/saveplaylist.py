import graphene
from graphene.types.generic import GenericScalar

from api.types import *
from playlists.models import Playlist
from user_profiles.models import UserProfile


class SavePlaylist(graphene.Mutation):
    success = graphene.Boolean()
    errors = GenericScalar()

    class Arguments:
        playlist_form = PlaylistFormT()

    def mutate(self, info, playlist_form):
        id = playlist_form.pop("id")
        user_profile = UserProfile.objects.get(user_id=info.context.user.id)
        playlist, created = Playlist.objects.update_or_create(
            defaults=playlist_form, id=id, owner_id=user_profile.id
        )

        return SavePlaylist(
            success=True,
            errors={},
        )
