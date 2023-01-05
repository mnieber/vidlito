import graphene
from api.types import *
from clips.models import Clip
from graphene.types.generic import GenericScalar
from playlists.models import Entry, Playlist


class SaveClipOrdering(graphene.Mutation):
    success = graphene.Boolean()
    errors = GenericScalar()

    class Arguments:
        playlist_id = graphene.ID()
        clip_ids = graphene.List(graphene.String)

    def mutate(self, info, playlist_id, clip_ids):
        playlist = Playlist.objects.get(id=playlist_id)
        playlist.entry_set.all().delete()

        for idx, clip_id in enumerate(clip_ids):
            Entry.objects.create(playlist=playlist, clip_id=clip_id, sort_pos=1 + idx)

        return SaveClipOrdering(
            success=True,
            errors={},
        )
