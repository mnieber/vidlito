from api.types.playlistform_t import PlaylistFormT


def get_or_create_help_playlist():
    from playlists.models import Playlist
    from users.utils.get_or_create_vidlito_user import get_or_create_vidlito_user

    playlist_form = PlaylistFormT(
        name="Help",
        slug="help-",
        is_public=True,
        description="This is the help playlist. It is created automatically when you sign up.",
    )

    owner = get_or_create_vidlito_user()
    playlist, created = Playlist.objects.update_or_create(
        defaults=playlist_form, owner_id=owner.id
    )
    return playlist
