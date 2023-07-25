def username_already_taken(username):
    from user_profiles.models import UserProfile

    return UserProfile.objects.filter(username=username).exists()
