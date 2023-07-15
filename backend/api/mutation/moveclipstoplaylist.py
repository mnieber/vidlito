import graphene
from graphene.types.generic import GenericScalar

from api.mutation.moveclipstotrash import pick_new_source_movelist
from api.types import *
from playlists.models import Entry, dest_playlist,
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

        entries_to_delete = []
        for entry in Entry.objects.filter(playlist_id=src_playlist_id):
            save_clip = False
            if entry.clip_id in clip_ids:
                if entry.clip_id.hex in dest_clips_id_hexes:
                    # If the clip is already in the destination playlist, then
                    # moving the clip to the destination playlist implies
                    # deleting the entry from the source playlist.
                    entries_to_delete.append(entry)
                    continue

                if copy:
                    entry.pk = None
                entry.playlist_id = dest_playlist_id
                entry.save()

                if not copy and entry.clip.source_playlist_id == src_playlist_id:
                    pick_new_source_movelist(
                        info, entry.clip, dest_playlist, save=False
                    )
                    entry.clip.source_playlist_id = dest_playlist_id
                    save_clip = True

                if copy and dest_playlist.is_public:
                    entry.clip.nr_of_public_playlists += 1
                    save_clip = True

                if not copy and src_playlist.is_public:
                    entry.clip.nr_of_public_playlists -= 1
                    save_clip = True

            if save_clip:
                entry.clip.save()

        for entry in entries_to_delete:
            entry.delete()

        src_playlist.update_nr_clips()
        dest_playlist.update_nr_clips()

        return MoveClipsToPlaylist(
            success=True,
            errors={},
        )
