import graphene
from graphene.types.generic import GenericScalar

from api.types import *
from clips.models import Clip
from playlists.models import Entry, Playlist, create_tags


class SaveClip(graphene.Mutation):
    success = graphene.Boolean()
    errors = GenericScalar()

    class Arguments:
        playlist_id = graphene.ID()
        clip_form = ClipFormT()

    def mutate(self, info, playlist_id, clip_form):
        playlist = Playlist.objects.get(
            id=playlist_id, owner__user_id=info.context.user.id
        )
        id = clip_form.pop("id")
        clip_form["tags"] = create_tags(clip_form.get("tags", []))
        clip, created = Clip.objects.update_or_create(
            defaults=clip_form, id=id, owner=playlist.owner
        )

        if created:
            entry = Entry(clip=clip, playlist=playlist)
            entry.save()

        return SaveClip(
            success=True,
            errors={},
        )
