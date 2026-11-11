from django import forms
from django.utils.translation import gettext_lazy as _

from vidlito_be.user_profiles.utils import username_already_taken

RESERVED_USERNAMES = ["vidlito"]


class SignupForm(forms.Form):
    """The vidlito-specific fields of sign-up (see ACCOUNT_SIGNUP_FORM_CLASS).

    The username field is called profile_username, because allauth removes a field
    called username when the user model has no username (the username of vidlito is
    stored in the user profile).
    """

    profile_username = forms.CharField(max_length=90)
    accepts_terms = forms.BooleanField(
        error_messages={"required": _("You need to accept the terms and conditions.")}
    )

    def clean_profile_username(self):
        username = self.cleaned_data["profile_username"].strip()
        if not username:
            raise forms.ValidationError(_("Please enter a username."))
        if username.lower() in RESERVED_USERNAMES or username_already_taken(username):
            raise forms.ValidationError(_("This username is already taken."))
        return username

    def signup(self, request, user):
        # The account adapter sets up the new account (see AccountAdapter.save_user)
        pass
