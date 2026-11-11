import graphene
from graphene.types.generic import GenericScalar

from vidlito_be.api.types import *
from vidlito_be.app.utils.tags import create_tags
from vidlito_be.playlists.models import PlaylistPd
from vidlito_be.user_profiles.models import UserProfile


class SavePlaylistPd(graphene.Mutation):
    success = graphene.Boolean()
    errors = GenericScalar()

    class Arguments:
        playlist_id = graphene.UUID(required=True)
        playlist_pd_form = PlaylistPdFormT(required=True)

    def mutate(self, info, playlist_id, playlist_pd_form):
        owner_id = UserProfile.get_id(info)
        id = playlist_pd_form.pop("id")
        playlist_pd_form["tags"] = create_tags(playlist_pd_form.get("tags", []))
        PlaylistPd.objects.update_or_create(
            defaults=playlist_pd_form,
            id=id,
            playlist_id=playlist_id,
            owner_id=owner_id,
        )

        return SavePlaylistPd(
            success=True,
            errors={},
        )
