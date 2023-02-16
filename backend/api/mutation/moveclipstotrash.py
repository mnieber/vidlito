import graphene
from actions.models import Action
from api.types import *
from app.utils.case import u0
from clips.models import Clip
from django.db import transaction
from django.utils.text import Truncator
from graphene.types.generic import GenericScalar
from playlists.models import Playlist

teaser_tpl = "From playlist **{playlist_name}**, removed {nr_clips) {clip}: {clips}"


def get_teaser(playlist_name, clips):
    nr_clips = len(clips)
    clip_names = [x.name for x in clips]
    text = teaser_tpl.format(
        playlist_name=u0(playlist_name),
        clip="clip" if nr_clips == 1 else "clips",
        nr_clips=nr_clips,
        clips=", ".join(clip_names),
    )
    truncator = Truncator(text)
    return truncator.words(20)


class MoveClipsToTrash(graphene.Mutation):
    success = graphene.Boolean()
    errors = GenericScalar()

    class Arguments:
        playlist_id = graphene.ID()
        clip_ids = graphene.List(graphene.String)

    def mutate(self, info, playlist_id, clip_ids):
        clips = Clip.objects.filter(id__in=clip_ids)
        teaser = get_teaser(playlist_name="My Playlist", clips=clips)

        with transaction.atomic():
            action = Action(type="TrashEntries", teaser=teaser)
            action.save()

            playlist = Playlist.objects.get(id=playlist_id)
            for entry in playlist.entry_set.filter(entry_id__in=clip_ids):
                entry.is_deleted = True
                entry.save()

        return MoveClipsToTrash(
            success=True,
            errors={},
        )
