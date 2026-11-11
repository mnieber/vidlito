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
        from vidlito_be.users.utils.setup_new_account import setup_new_account

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
            setup_new_account(user, username=username)

        return user

    def create_superuser(self, email: str, password: str = None, **kwargs: T.Any):
        from allauth.account.models import EmailAddress

        username = kwargs.get("username") or email.split("@")[0]
        user = self.create_user(
            email, username=username, password=password, accepts_terms=True
        )
        user.is_superuser = True
        user.is_staff = True
        user.save()
        # A superuser can sign in without verifying their email address
        EmailAddress.objects.create(
            user=user, email=user.email, primary=True, verified=True
        )
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
