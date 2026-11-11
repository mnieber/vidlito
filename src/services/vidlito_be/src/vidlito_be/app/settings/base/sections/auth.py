from vidlito_be.app.utils.env import env

AUTHENTICATION_BACKENDS = [
    "django.contrib.auth.backends.ModelBackend",
    "allauth.account.auth_backends.AuthenticationBackend",
]

ACCOUNT_LOGIN_METHODS = {"email"}
ACCOUNT_SIGNUP_FIELDS = ["email*", "password1*"]
ACCOUNT_USER_MODEL_USERNAME_FIELD = None
ACCOUNT_EMAIL_VERIFICATION = "mandatory"
# Adds the vidlito-specific fields (username, accepts_terms) to sign-up
ACCOUNT_SIGNUP_FORM_CLASS = "vidlito_be.users.forms.SignupForm"
# Sets the terms, and creates the user profile of a new account
ACCOUNT_ADAPTER = "vidlito_be.users.adapter.AccountAdapter"

HEADLESS_ONLY = True
HEADLESS_FRONTEND_URLS = {
    "account_confirm_email": "/account/verify-email/{key}",
    "account_reset_password": "/account/password/reset",
    "account_reset_password_from_key": "/account/password/reset/{key}",
    "account_signup": "/sign-up",
}

SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True

AUTH_USER_MODEL = "users.User"

TERMS_VERSION = "15-08-2021"

VIDLITO_PASSWORD = env("DJANGO_VIDLITO_PASSWORD")
VIDLITO_EMAIL = env("DJANGO_VIDLITO_EMAIL")
