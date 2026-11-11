from vidlito_be.api.types.playlistform_t import PlaylistFormT


def get_or_create_help_playlist():
    from vidlito_be.playlists.models import Playlist
    from vidlito_be.users.utils.get_or_create_vidlito_user import get_or_create_vidlito_user

    playlist = Playlist.objects.filter(slug="help-").first()
    if playlist:
        return playlist

    playlist_form = PlaylistFormT(
        name="Help",
        slug="help-",
        is_public=True,
        description="This is the help playlist. It is created automatically when you sign up.",
    )

    owner = get_or_create_vidlito_user()
    playlist = Playlist.objects.create(**playlist_form.kwargs, owner_id=owner.id)
    return playlist
