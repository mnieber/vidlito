import graphene
from graphene.types.generic import GenericScalar

from api.mutation.moveclipstotrash import pick_new_source_movelist
from api.types import *
from playlists.models import Entry, Playlist


class DeletePlaylist(graphene.Mutation):
    success = graphene.Boolean()
    errors = GenericScalar()

    class Arguments:
        playlist_id = graphene.UUID(required=True)

    def mutate(self, info, playlist_id):
        playlist = Playlist.get_mine(info, id=playlist_id)
        my_entries = Entry.objects.filter(playlist__owner__user_id=info.context.user.id)
        for entry in playlist.entry_set.all():
            clip = entry.clip
            save_clip = False

            if my_entries.filter(clip=clip).count() == 1:
                clip.delete()
                continue

            if playlist.is_public:
                clip.nr_of_public_playlists -= 1
                save_clip = True

            if clip.source_playlist_id == playlist.id:
                pick_new_source_movelist(info, clip, None, save=False)
                save_clip = True

            if save_clip:
                clip.save()

        Playlist.objects.filter(id=playlist_id).delete()

        return DeletePlaylist(
            success=True,
            errors={},
        )
