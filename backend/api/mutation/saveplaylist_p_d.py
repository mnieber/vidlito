import graphene
from graphene.types.generic import GenericScalar

from api.types import *
from app.utils.tags import create_tags
from playlists.models import PlaylistPD
from user_profiles.models import UserProfile


class SavePlaylistPD(graphene.Mutation):
    success = graphene.Boolean()
    errors = GenericScalar()

    class Arguments:
        playlist_id = graphene.UUID(required=True)
        playlist_p_d_form = PlaylistPDFormT(required=True)

    def mutate(self, info, playlist_id, playlist_p_d_form):
        user_profile = UserProfile.get(info)
        id = playlist_p_d_form.pop("id")
        playlist_p_d_form["tags"] = create_tags(playlist_p_d_form.get("tags", []))
        PlaylistPD.objects.update_or_create(
            defaults=playlist_p_d_form,
            id=id,
            playlist_id=playlist_id,
            owner=user_profile,
        )

        return SavePlaylistPD(
            success=True,
            errors={},
        )
