import graphene
from django.db import transaction
from graphene.types.generic import GenericScalar

from api.mutation.moveclipstotrash import pick_new_source_movelist
from api.types import *
from playlists.models import Entry, Playlist


class MoveClipsToPlaylist(graphene.Mutation):
    success = graphene.Boolean()
    errors = GenericScalar()

    class Arguments:
        src_playlist_id = graphene.UUID(required=True)
        dest_playlist_id = graphene.UUID(required=True)
        clip_ids = graphene.List(graphene.UUID, required=True)
        copy = graphene.Boolean(required=True)

    def mutate(self, info, src_playlist_id, dest_playlist_id, clip_ids, copy):
        src_playlist = Playlist.get_mine(info, id=src_playlist_id)
        dest_playlist = Playlist.get_mine(info, id=dest_playlist_id)

        dest_clips_id_hexes = (
            [x.clip_id.hex for x in Entry.objects.filter(playlist_id=dest_playlist_id)]
            if copy
            else []
        )

        with transaction.atomic():
            entries_to_delete = []
            for entry in Entry.objects.filter(
                playlist_id=src_playlist_id, clip_id__in=clip_ids
            ):
                if not copy and entry.clip_id.hex in dest_clips_id_hexes:
                    # If the clip is already in the destination playlist, then
                    # moving the clip to the destination playlist implies
                    # deleting the entry from the source playlist.
                    entries_to_delete.append(entry)
                    continue

                if copy:
                    entry.pk = None
                entry.playlist_id = dest_playlist_id
                entry.save()

                clip = entry.clip
                _update_source_movelist(info, copy, clip, src_playlist, dest_playlist)

                if copy:
                    if dest_playlist.is_public:
                        clip.nr_of_public_playlists += 1
                    else:
                        clip.nr_of_private_playlists += 1

                if not copy:
                    if src_playlist.is_public:
                        clip.nr_of_public_playlists -= 1
                    else:
                        clip.nr_of_private_playlists -= 1

                clip.save()

            Entry.filter(id__in=[entry.id for entry in entries_to_delete]).delete()

            src_playlist.update_nr_clips()
            dest_playlist.update_nr_clips()

        return MoveClipsToPlaylist(
            success=True,
            errors={},
        )


def _update_source_movelist(info, copy, clip, src_playlist, dest_playlist):
    def is_moving_away_from_source_playlist():
        return not copy and clip.source_playlist_id == src_playlist.id

    def is_copying_towards_new_source_playlist():
        return copy and dest_playlist.is_public and clip.nr_of_public_playlists == 0

    if (
        is_moving_away_from_source_playlist()
        or is_copying_towards_new_source_playlist()
    ):
        pick_new_source_movelist(info, clip, dest_playlist, save=False)
        return True
    return False
