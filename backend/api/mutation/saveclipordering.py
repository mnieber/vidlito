import graphene
from graphene.types.generic import GenericScalar

from api.types import *
from app.utils.ids import sort_items
from playlists.models import Playlist


class SaveClipOrdering(graphene.Mutation):
    success = graphene.Boolean()
    errors = GenericScalar()

    class Arguments:
        playlist_id = graphene.UUID(required=True)
        clip_ids = graphene.List(graphene.UUID, required=True)

    def mutate(self, info, playlist_id, clip_ids):
        playlist = Playlist.objects.get(id=playlist_id)
        sort_items(playlist.entry_set.all(), clip_ids, lambda x: x.clip_id)

        return SaveClipOrdering(
            success=True,
            errors={},
        )
