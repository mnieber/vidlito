import graphene
from graphene.types.generic import GenericScalar

from api.types import *
from clips.utils import pick_new_source_movelist
from playlists.models import Playlist


class SavePlaylistSettings(graphene.Mutation):
    success = graphene.Boolean()
    errors = GenericScalar()

    class Arguments:
        playlist_settings_form = PlaylistSettingsFormT(required=True)

    def mutate(self, info, playlist_settings_form):
        playlist_id = playlist_settings_form.pop("playlist_id")
        playlist = Playlist.get_mine(info, id=playlist_id)
        if playlist.is_public != playlist_settings_form.is_public:
            playlist.is_public = playlist_settings_form.is_public
            playlist.save()

            for entry in playlist.entry_set.all():
                clip = entry.clip
                if playlist_settings_form.is_public:
                    clip.nr_of_public_playlists += 1
                    clip.nr_of_private_playlists += -1
                else:
                    clip.nr_of_public_playlists += -1
                    clip.nr_of_private_playlists += 1

                if (
                    not playlist_settings_form.is_public
                    and clip.source_playlist_id == playlist.id
                ):
                    pick_new_source_movelist(info, clip, None, save=False)
                clip.save()

        return SavePlaylistSettings(
            success=True,
            errors={},
        )
