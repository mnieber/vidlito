from allauth.account.adapter import DefaultAccountAdapter
from django.conf import settings
from django.db import transaction

from vidlito_be.users.utils.setup_new_account import setup_new_account


class AccountAdapter(DefaultAccountAdapter):
    def save_user(self, request, user, form, commit=True):
        data = form.cleaned_data
        with transaction.atomic():
            user = super().save_user(request, user, form, commit=False)
            user.accepts_terms = data["accepts_terms"]
            user.terms_version_accepted = settings.TERMS_VERSION
            user.save()
            setup_new_account(user, username=data["profile_username"])
        return user
