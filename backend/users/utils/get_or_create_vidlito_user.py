from django.conf import settings


def get_or_create_vidlito_user():
    from users.models import User

    try:
        return User.objects.get(username="vidlito")
    except User.DoesNotExist:
        return User.objects.create_user(
            email=settings.VIDLITO_EMAIL,
            password=settings.VIDLITO_PASSWORD,
            accepts_terms=True,
        )
