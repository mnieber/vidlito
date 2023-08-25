from adminsortable2.admin import SortableAdminBase
from django.contrib import admin

from playlists.admin import FollowInline
from user_profiles import models


@admin.register(models.UserProfile)
class UserProfileAdmin(SortableAdminBase, admin.ModelAdmin):
    inlines = (FollowInline,)
