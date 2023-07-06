from django_rtk_green import django_rtk_green_apps

DJANGO_APPS = [
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.admin",
    "django.contrib.sites",
    "django.contrib.sitemaps",
    "django.contrib.staticfiles",
    "django.contrib.messages",
]

THIRD_PARTY_APPS = [
    "adminsortable2",
    "admin_reorder",
    "corsheaders",
    "dbbackup",
    "django_extensions",
    *django_rtk_green_apps,
    "graphene_django",
    "graphql_jwt.refresh_token.apps.RefreshTokenConfig",
    "martor",
]

LOCAL_APPS = [
    "actions.apps.ActionsConfig",
    "api.apps.ApiConfig",
    "app.apps.AppConfig",
    "clips.apps.ClipsConfig",
    "playlists.apps.PlaylistsConfig",
    "tags.apps.TagsConfig",
    "user_accounts.apps.UserAccountsConfig",
    "user_profiles.apps.UserProfilesConfig",
    "users.apps.UsersConfig",
]

# https://docs.djangoproject.com/en/dev/ref/settings/#installed-apps
INSTALLED_APPS = DJANGO_APPS + THIRD_PARTY_APPS + LOCAL_APPS

ADMIN_REORDER = (
    {
        "app": "clips",
        "models": (
            "clips.Clip",
            "clips.ClipPD",
        ),
    },
    {
        "app": "playlists",
        "models": (
            "playlists.Playlist",
            "playlists.PlaylistPD",
        ),
    },
    {"app": "app", "models": ("app.SlugSequence",)},
    "user_profiles",
    "users",
    {
        "app": "refresh_token",
        "label": "Django-RTK",
        "models": (
            "refresh_token.RefreshToken",
            "django_rtk_later.ActivationToken",
            "django_rtk_magic_link.MagicLinkToken",
            "django_rtk_password.PasswordResetToken",
        ),
    },
    "actions",
    "tags",
    "auth",
    "sites",
)
