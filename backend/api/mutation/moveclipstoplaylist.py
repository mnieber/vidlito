import graphene
from graphene.types.generic import GenericScalar

from api.types import *
from playlists.models import Entry


class MoveClipsToPlaylist(graphene.Mutation):
    success = graphene.Boolean()
    errors = GenericScalar()

    class Arguments:
        src_playlist_id = graphene.UUID(required=True)
        dest_playlist_id = graphene.UUID(required=True)
        clip_ids = graphene.List(graphene.UUID, required=True)
        copy = graphene.Boolean(required=True)

    def mutate(self, info, src_playlist_id, dest_playlist_id, clip_ids, copy):
        dest_clips_ids = (
            [x.clip_id for x in Entry.objects.filter(playlist_id=dest_playlist_id)]
            if copy
            else []
        )
        for entry in Entry.objects.filter(playlist_id=src_playlist_id):
            if entry.clip_id in clip_ids:
                if copy:
                    if entry.clip_id.hex in dest_clips_ids:
                        continue
                    entry.pk = None
                entry.playlist_id = dest_playlist_id
                entry.save()

        return MoveClipsToPlaylist(
            success=True,
            errors={},
        )
