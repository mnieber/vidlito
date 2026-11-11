from django.contrib import admin

from vidlito_be.actions import models


@admin.register(models.Action)
class ActionAdmin(admin.ModelAdmin):
    pass
