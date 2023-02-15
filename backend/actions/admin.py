from django.contrib import admin

from actions import models


@admin.register(models.Action)
class ActionAdmin(admin.ModelAdmin):
    pass
