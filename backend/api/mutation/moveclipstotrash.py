import graphene
from django.db import transaction
from graphene.types.generic import GenericScalar

from actions.models import Action
from api.types import *
from clips.models import Clip
from playlists.models import Playlist
from user_profiles.models import UserProfile


class MoveClipsToTrash(graphene.Mutation):
    success = graphene.Boolean()
    errors = GenericScalar()

    class Arguments:
        playlist_id = graphene.UUID(required=True)
        clip_ids = graphene.List(graphene.UUID, required=True)

    def mutate(self, info, playlist_id, clip_ids):
        playlist = Playlist.objects.get(id=playlist_id)
        owner = UserProfile.get(info)
        clips = Clip.objects.filter(id__in=clip_ids)

        with transaction.atomic():
            action = Action(
                type="TrashEntries",
                playlist_id=playlist.id,
                owner=owner,
                data={
                    "clip_ids": [str(x) for x in clip_ids],
                    "clip_names": [x.name for x in clips],
                    "playlist_name": playlist.name,
                },
            )
            action.save()

            for entry in playlist.entry_set.filter(clip_id__in=clip_ids):
                entry.is_deleted = True
                entry.save()

        return MoveClipsToTrash(
            success=True,
            errors={},
        )
