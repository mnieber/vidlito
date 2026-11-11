import graphene
from django.db import transaction
from graphene.types.generic import GenericScalar

from vidlito_be.api.types import *
from vidlito_be.app.utils.slug_seq import update_slug
from vidlito_be.app.utils.tags import create_tags
from vidlito_be.playlists.models import Follow, Playlist
from vidlito_be.user_profiles.models import UserProfile


class SavePlaylist(graphene.Mutation):
    created = graphene.Boolean()
    playlist = graphene.Field(PlaylistT)
    success = graphene.Boolean()
    errors = GenericScalar()

    class Arguments:
        playlist_form = PlaylistFormT(required=True)

    def mutate(self, info, playlist_form):
        id = playlist_form.pop("id")
        playlist = Playlist.filter_mine(info, id=id).first()
        owner_id = UserProfile.get_id(info)
        playlist_form["tags"] = create_tags(playlist_form["tags"])

        with transaction.atomic():
            if not playlist or playlist_form.slug != playlist.slug:
                playlist_form["slug"] = update_slug(playlist_form["slug"], "playlist")

            playlist, created = Playlist.objects.update_or_create(
                defaults=playlist_form, id=id, owner_id=owner_id
            )
            if created:
                follow = Follow.objects.create(owner_id=owner_id, playlist=playlist)
                follow.save()

        return SavePlaylist(success=True, errors={}, created=created, playlist=playlist)
