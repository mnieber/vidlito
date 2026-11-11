import graphene
from graphene.types.generic import GenericScalar

from vidlito_be.api.types import *
from vidlito_be.clips.utils import pick_new_source_movelist
from vidlito_be.playlists.models import Playlist


class DeletePlaylists(graphene.Mutation):
    success = graphene.Boolean()
    errors = GenericScalar()

    class Arguments:
        playlist_ids = graphene.List(graphene.UUID, required=True)

    def mutate(self, info, playlist_ids):
        for playlist in Playlist.filter_mine(info, id__in=playlist_ids):
            for entry in playlist.entry_set.all():
                clip = entry.clip

                if playlist.is_public:
                    clip.nr_of_public_playlists -= 1
                else:
                    clip.nr_of_private_playlists -= 1

                if (
                    clip.nr_of_public_playlists == 0
                    and clip.nr_of_private_playlists == 0
                ):
                    clip.delete()
                    continue

                if clip.source_playlist_id == playlist.id:
                    pick_new_source_movelist(info, clip, None, save=False)

                clip.save()

            playlist.delete()

        return DeletePlaylists(
            success=True,
            errors={},
        )
