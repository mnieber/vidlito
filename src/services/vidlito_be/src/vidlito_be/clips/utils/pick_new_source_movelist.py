# This function sets a new value for clip.source_playlist_id.
# If possible, it picks a public playlist.
# It favours the candidate_playlist above other playlists.
from vidlito_be.playlists.models import Entry
from vidlito_be.user_profiles.models import UserProfile


def pick_new_source_movelist(info, clip, candidate_playlist, save):
    private_source_playlist = (
        candidate_playlist
        if (candidate_playlist and not candidate_playlist.is_public)
        else None
    )

    public_source_playlist = (
        candidate_playlist
        if (candidate_playlist and candidate_playlist.is_public)
        else None
    )

    if not public_source_playlist:
        other_entries = Entry.objects.exclude(
            playlist_id=clip.source_playlist_id
        ).filter(
            clip_id=clip.id,
            playlist__owner_id=UserProfile.get_id(info),
        )

        public_source_playlist = other_entries.filter(playlist__is_public=True).first()
        if not public_source_playlist:
            if not private_source_playlist:
                private_source_playlist = other_entries.first()

    if public_source_playlist:
        clip.source_playlist_id = public_source_playlist.id
    elif private_source_playlist:
        clip.source_playlist_id = private_source_playlist.id
    else:
        clip.source_playlist_id = None

    if save:
        clip.save()
