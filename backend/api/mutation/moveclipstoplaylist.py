import graphene
from graphene.types.generic import GenericScalar

from api.types import *
from playlists.models import Entry


class MoveClipsToPlaylist(graphene.Mutation):
    success = graphene.Boolean()
    errors = GenericScalar()

    class Arguments:
        src_playlist_id = graphene.UUID()
        dest_playlist_id = graphene.UUID()
        clip_ids = graphene.List(graphene.UUID)
        copy = graphene.Boolean()

    def mutate(self, info, src_playlist_id, dest_playlist_id, clip_ids, copy):
        clean_clip_ids = [x.replace("-", "") for x in clip_ids]
        dest_clips_ids = (
            [x.clip_id.hex for x in Entry.objects.filter(playlist_id=dest_playlist_id)]
            if copy
            else []
        )
        for entry in Entry.objects.filter(playlist_id=src_playlist_id):
            if entry.clip_id.hex in clean_clip_ids:
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
