import typing as T
import uuid

from django.conf import settings
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)
from django.db import models, transaction


class UserManager(BaseUserManager):
    def create_user(
        self,
        email: str,
        username: str,
        password: str = None,
        accepts_terms: bool = False,
        terms_version_accepted: str = None,
        **kwargs
    ):
        from vidlito_be.playlists.models import Follow
        from vidlito_be.playlists.utils.get_or_create_help_playlist import (
            get_or_create_help_playlist,
        )
        from vidlito_be.user_profiles.models import UserProfile

        if not email:
            raise ValueError("Users must have an email address.")
        if not accepts_terms:
            raise ValueError("Users must accept the terms.")

        # The following check ensures that outside users cannot create an account
        # with username "vidlito"
        if username == "vidlito" or email == settings.VIDLITO_EMAIL:
            if password != settings.VIDLITO_PASSWORD:
                raise ValueError("Vidlito user password is incorrect.")

        with transaction.atomic():
            user = self.model(email=self.normalize_email(email))
            user.accepts_terms = accepts_terms
            user.terms_version_accepted = (
                terms_version_accepted or settings.TERMS_VERSION
            )
            user.set_password(password)
            user.save()

            # Note that we use the user id as the id for the user profile. This can speed up
            # the handling of graphql queries, since the user id is in the context.
            user_profile = UserProfile.objects.create(
                id=user.id, user_id=user.id, username=username
            )
            user_profile.save()

            help_playlist = get_or_create_help_playlist()
            Follow.objects.create(owner_id=user.id, playlist=help_playlist)

        return user

    def create_superuser(self, email: str, password: str = None, **kwargs: T.Any):
        user = self.create_user(email, password=password, accepts_terms=True)
        user.is_superuser = True
        user.is_staff = True
        user.save()
        return user


class User(AbstractBaseUser, PermissionsMixin):
    objects = UserManager()

    USERNAME_FIELD = "email"
    EMAIL_FIELD = "email"
    REQUIRED_FIELDS: T.List[str] = []

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(max_length=255, unique=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField("active", default=True)
    date_joined = models.DateTimeField("date joined", auto_now_add=True)
    accepts_terms = models.BooleanField()
    terms_version_accepted = models.CharField(max_length=10, default="1.0.0")
