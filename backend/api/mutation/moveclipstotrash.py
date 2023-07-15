from datetime import datetime

import graphene
from django.db import transaction
from graphene.types.generic import GenericScalar

from actions.models import Action
from api.types import *
from playlists.models import Entry, Playlist
from user_profiles.models import UserProfile


class MoveClipsToTrash(graphene.Mutation):
    success = graphene.Boolean()
    errors = GenericScalar()

    class Arguments:
        playlist_id = graphene.UUID(required=True)
        clip_ids = graphene.List(graphene.UUID, required=True)

    def mutate(self, info, playlist_id, clip_ids):
        owner = UserProfile.get_mine(info)
        playlist = Playlist.get_mine(info, id=playlist_id)
        entries = playlist.entry_set.filter(clip_id__in=clip_ids).select_related("clip")

        current_datetime = datetime.now()
        current_datetime_str = current_datetime.isoformat()

        with transaction.atomic():
            action = Action(
                type="TrashEntries",
                playlist_id=playlist.id,
                owner=owner,
                data={
                    "entry_ids": [entry.id for entry in entries],
                    "clip_names": [entry.clip.name for entry in entries],
                    "playlist_name": playlist.name,
                    "playlist_id": str(playlist.id),
                    "date": current_datetime_str,
                },
            )
            action.save()

            for entry in entries:
                # Update clip
                if playlist.is_public:
                    entry.clip.nr_of_public_playlists -= 1
                if entry.clip.source_playlist_id == playlist.id:
                    pick_new_source_movelist(info, entry.clip, None, save=False)
                entry.clip.save()

                # Update entry
                entry.is_deleted = True
                entry.save()

            playlist.update_nr_clips()

        return MoveClipsToTrash(
            success=True,
            errors={},
        )


def pick_new_source_movelist(info, clip, candidate_playlist, save):
    private_source_playlist_id = (
        candidate_playlist
        if (candidate_playlist and not candidate_playlist.is_public)
        else None
    )

    public_source_playlist_id = (
        candidate_playlist
        if (candidate_playlist and candidate_playlist.is_public)
        else None
    )

    for other_entry in Entry.filter_mine(
        info, clip_id=clip.id, playlist_id__ne=clip.source_playlist_id
    ).select_related("playlist"):
        if other_entry.playlist.is_public:
            if not public_source_playlist_id:
                public_source_playlist_id = other_entry.playlist.id
        else:
            if not private_source_playlist_id:
                private_source_playlist_id = other_entry.playlist.id

    if public_source_playlist_id:
        clip.source_playlist_id = public_source_playlist_id
    elif private_source_playlist_id:
        clip.source_playlist_id = private_source_playlist_id

    if save:
        clip.save()
