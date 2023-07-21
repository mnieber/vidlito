import graphene
from django.utils.text import slugify
from graphene.types.generic import GenericScalar

from actions.models import Action
from api.mutation.moveclipstotrash import pick_new_source_movelist
from api.types import *
from app.utils.slug_seq import update_slug
from playlists.models import Entry, Follow, Playlist


class UndoAction(graphene.Mutation):
    success = graphene.Boolean()
    errors = GenericScalar()

    class Arguments:
        action_id = graphene.UUID(required=True)

    def mutate(self, info, action_id):
        action = Action.get_mine(info, id=action_id)
        if action.type == "TrashEntries":
            playlist_id = action.data["playlist_id"]
            playlist = Playlist.filter_mine(info, id=playlist_id).first()
            if not playlist:
                playlist = Playlist.objects.create(
                    owner_id=info.context.user.id,
                    name=action.data["playlist_name"] + " (recreated)",
                    slug=update_slug(slugify(action.data["playlist_name"]), "playlist"),
                )
                Follow.objects.create(playlist=playlist, owner_id=info.context.user.id)

            entries_to_delete = []
            entry_ids = action.data["entry_ids"]
            for entry in Entry.objects.trash().filter(id__in=entry_ids):
                if Entry.objects.filter(
                    clip_id=entry.clip_id, playlist_id=entry.playlist_id
                ).exists():
                    entries_to_delete.append(entry)
                    continue

                entry.is_deleted = False
                entry.save()

                clip = entry.clip

                if not clip.source_playlist_id or (
                    playlist.is_public and clip.nr_of_public_playlists == 0
                ):
                    pick_new_source_movelist(info, clip, playlist, save=False)
                    save_clip = True

                if playlist.is_public:
                    clip.nr_of_public_playlists += 1
                else:
                    clip.nr_of_private_playlists += 1

                clip.save()

            Entry.filter(id__in=[entry.id for entry in entries_to_delete]).delete()

            action.delete()
            playlist.update_nr_clips()

        return UndoAction(
            success=True,
            errors={},
        )
