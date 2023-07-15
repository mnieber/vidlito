import graphene
from graphene.types.generic import GenericScalar

from api.types import *
from app.utils.tags import create_tags
from playlists.models import PlaylistPd
from user_profiles.models import UserProfile


class SavePlaylistPd(graphene.Mutation):
    success = graphene.Boolean()
    errors = GenericScalar()

    class Arguments:
        playlist_id = graphene.UUID(required=True)
        playlist_pd_form = PlaylistPdFormT(required=True)

    def mutate(self, info, playlist_id, playlist_pd_form):
        user_profile = UserProfile.get_mine(info)
        id = playlist_pd_form.pop("id")
        playlist_pd_form["tags"] = create_tags(playlist_pd_form.get("tags", []))
        PlaylistPd.objects.update_or_create(
            defaults=playlist_pd_form,
            id=id,
            playlist_id=playlist_id,
            owner=user_profile,
        )

        return SavePlaylistPd(
            success=True,
            errors={},
        )
