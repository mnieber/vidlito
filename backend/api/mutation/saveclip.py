import graphene
from graphene.types.generic import GenericScalar

from api.types import *
from app.utils.ids import insert_id, sort_items
from clips.models import Clip
from playlists.models import Entry, Playlist, create_tags


class SaveClip(graphene.Mutation):
    success = graphene.Boolean()
    errors = GenericScalar()

    class Arguments:
        playlist_id = graphene.UUID(required=True)
        clip_form = ClipFormT(required=True)
        parent_clip_id = graphene.UUID()

    def mutate(self, info, playlist_id, clip_form, parent_clip_id=None):
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

            if parent_clip_id:
                entries = playlist.entry_set.all()
                ids = insert_id([x.clip_id for x in entries], parent_clip_id, clip.id)
                sort_items(entries, ids, lambda x: x.clip_id)

        return SaveClip(
            success=True,
            errors={},
        )
