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
        playlist, created = Playlist.objects.update_or_create(**playlist_form)

        return SavePlaylist(
            success=True,
            errors={},
        )
