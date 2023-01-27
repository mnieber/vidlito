from django.contrib import admin

from user_profiles import models


@admin.register(models.UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    pass
