import graphene
from api.types import *
from graphene.types.generic import GenericScalar
from playlists.models import Playlist


class SavePlaylist(graphene.Mutation):
    success = graphene.Boolean()
    errors = GenericScalar()

    class Arguments:
        playlist_form = PlaylistFormT()

    def mutate(self, info, playlist_form):
        id = playlist_form.pop("id")
        playlist_form["owner_id"] = info.context.user.id
        playlist, created = Playlist.objects.update_or_create(
            defaults=playlist_form, id=id
        )

        return SavePlaylist(
            success=True,
            errors={},
        )
