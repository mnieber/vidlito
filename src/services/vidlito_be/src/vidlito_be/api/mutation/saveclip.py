import graphene
from django.db import transaction
from graphene.types.generic import GenericScalar

from vidlito_be.api.types import *
from vidlito_be.app.utils.ids import insert_id, sort_items
from vidlito_be.app.utils.slug_seq import update_slug
from vidlito_be.app.utils.tags import create_tags
from vidlito_be.clips.models import Clip
from vidlito_be.playlists.models import Entry, Playlist
from vidlito_be.user_profiles.models import UserProfile


class SaveClip(graphene.Mutation):
    success = graphene.Boolean()
    errors = GenericScalar()
    clip = graphene.Field(ClipT)

    class Arguments:
        playlist_id = graphene.UUID(required=True)
        clip_form = ClipFormT(required=True)
        parent_clip_id = graphene.UUID()

    def mutate(self, info, playlist_id, clip_form, parent_clip_id=None):
        playlist = Playlist.get_mine(info, id=playlist_id)
        id = clip_form.pop("id")
        clip = Clip.filter_mine(info, id=id).first()
        clip_form["tags"] = create_tags(clip_form.get("tags", []))

        with transaction.atomic():
            if not clip or clip_form.slug != clip.slug:
                clip_form["slug"] = update_slug(clip_form["slug"], "clip")

            clip, created = Clip.objects.update_or_create(
                defaults=clip_form, id=id, owner_id=UserProfile.get_id(info)
            )

            if created:
                clip.source_playlist_id = playlist.id
                if playlist.is_public:
                    clip.nr_of_public_playlists = 1
                else:
                    clip.nr_of_private_playlists = 1
                clip.save()

                entry = Entry(clip=clip, playlist=playlist)
                entry.save()

                if parent_clip_id:
                    entries = playlist.entry_set.all()
                    ids = insert_id(
                        [x.clip_id for x in entries], parent_clip_id, clip.id
                    )
                    sort_items(entries, ids, lambda x: x.clip_id)

                playlist.update_nr_clips()

        return SaveClip(
            success=True,
            errors={},
            clip=clip,
        )
