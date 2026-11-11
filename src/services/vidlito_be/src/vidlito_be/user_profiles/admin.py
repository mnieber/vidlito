from adminsortable2.admin import SortableAdminBase
from django.contrib import admin

from vidlito_be.playlists.admin import FollowInline
from vidlito_be.user_profiles import models


@admin.register(models.UserProfile)
class UserProfileAdmin(SortableAdminBase, admin.ModelAdmin):
    inlines = (FollowInline,)
