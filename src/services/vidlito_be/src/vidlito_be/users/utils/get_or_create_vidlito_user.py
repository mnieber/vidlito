from django.conf import settings


def get_or_create_vidlito_user():
    from django.contrib.auth import get_user_model

    user = get_user_model().objects.filter(email=settings.VIDLITO_EMAIL).first()
    if not user:
        user = get_user_model().objects.create_user(
            email=settings.VIDLITO_EMAIL,
            username="vidlito",
            password=settings.VIDLITO_PASSWORD,
            accepts_terms=True,
        )
    return user
