def setup_new_account(user, username: str):
    """Create the user profile of a new account, and follow the help playlist."""
    from vidlito_be.playlists.models import Follow
    from vidlito_be.playlists.utils.get_or_create_help_playlist import (
        get_or_create_help_playlist,
    )
    from vidlito_be.user_profiles.models import UserProfile

    # Note that we use the user id as the id for the user profile. This can speed up
    # the handling of graphql queries, since the user id is in the context.
    UserProfile.objects.create(id=user.id, user_id=user.id, username=username)

    help_playlist = get_or_create_help_playlist()
    Follow.objects.create(owner_id=user.id, playlist=help_playlist)
