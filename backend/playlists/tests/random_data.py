import faker
from api.types.playlist_form_t import PlaylistFormT
from playlists.models import Entry, Playlist

f = faker.Faker()


def create_random_playlist():
    obj, created = Playlist.objects.get_or_create(
        description="# " + f.word(), name=f.word(), slug=f.word()
    )
    return obj


def create_random_entry(clip_id, playlist_id):
    obj, created = Entry.objects.get_or_create(clip_id=clip_id, playlist_id=playlist_id)
    return obj


def create_random_playlist_form():
    return PlaylistFormT(
        name="my playlist",
    )
