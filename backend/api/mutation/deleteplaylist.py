import graphene
from api.types import *
from graphene.types.generic import GenericScalar
from playlists.models import Playlist


class DeletePlaylist(graphene.Mutation):
    success = graphene.Boolean()
    errors = GenericScalar()

    class Arguments:
        playlist_id = graphene.ID()

    def mutate(self, info, playlist_id):
        Playlist.objects.filter(id=playlist_id).delete()

        return DeletePlaylist(
            success=True,
            errors={},
        )
