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
        for entry in playlist.entry_set.all():
            clip = entry.clip

            if playlist.is_public:
                clip.nr_of_public_playlists -= 1
            else:
                clip.nr_of_private_playlists -= 1

            if clip.nr_of_public_playlists == 0 and clip.nr_of_private_playlists == 0:
                clip.delete()
                continue

            if clip.source_playlist_id == playlist.id:
                pick_new_source_movelist(info, clip, None, save=False)

            clip.save()

        playlist.delete()

        return DeletePlaylist(
            success=True,
            errors={},
        )
