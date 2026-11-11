def username_already_taken(username):
    from vidlito_be.user_profiles.models import UserProfile

    return UserProfile.objects.filter(username=username).exists()
