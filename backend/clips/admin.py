from django.contrib import admin

from clips import models


@admin.register(models.Clip)
class ClipAdmin(admin.ModelAdmin):
    pass
