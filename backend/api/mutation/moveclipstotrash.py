from datetime import datetime

import graphene
from django.db import transaction
from graphene.types.generic import GenericScalar

from actions.models import Action
from api.types import *
from clips.utils import pick_new_source_movelist
from playlists.models import Playlist
from user_profiles.models import UserProfile


class MoveClipsToTrash(graphene.Mutation):
    success = graphene.Boolean()
    errors = GenericScalar()

    class Arguments:
        playlist_id = graphene.UUID(required=True)
        clip_ids = graphene.List(graphene.UUID, required=True)

    def mutate(self, info, playlist_id, clip_ids):
        owner_id = UserProfile.get_id(info)
        playlist = Playlist.get_mine(info, id=playlist_id)
        entries = playlist.entry_set.filter(clip_id__in=clip_ids).select_related("clip")

        current_datetime = datetime.now()
        current_datetime_str = current_datetime.isoformat()

        with transaction.atomic():
            action = Action(
                type="TrashEntries",
                playlist_id=playlist.id,
                owner_id=owner_id,
                data={
                    "entry_ids": [entry.id.hex for entry in entries],
                    "clip_names": [entry.clip.name for entry in entries][:3]
                    + (["..."] if len(entries) > 3 else []),
                    "playlist_id": playlist.id.hex,
                    "playlist_name": playlist.name,
                    "date": current_datetime_str,
                },
            )
            action.save()

            for entry in entries:
                # Update clip
                clip = entry.clip
                if playlist.is_public:
                    clip.nr_of_public_playlists -= 1
                else:
                    clip.nr_of_private_playlists -= 1
                if clip.source_playlist_id == playlist.id:
                    pick_new_source_movelist(info, clip, None, save=False)
                clip.save()

                # Update entry
                entry.is_deleted = True
                entry.save()

            playlist.update_nr_clips()

        return MoveClipsToTrash(
            success=True,
            errors={},
        )
