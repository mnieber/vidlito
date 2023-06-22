from adminsortable2.admin import SortableAdminBase, SortableInlineAdminMixin
from django.contrib import admin

from playlists.models import Follow
from user_profiles import models


class FollowInline(SortableInlineAdminMixin, admin.TabularInline):
    model = Follow
    extra = 3


@admin.register(models.UserProfile)
class UserProfileAdmin(SortableAdminBase, admin.ModelAdmin):
    inlines = (FollowInline,)
