from django.contrib import admin

from vidlito_be.clips import models


@admin.register(models.Clip)
class ClipAdmin(admin.ModelAdmin):
    pass


@admin.register(models.ClipPd)
class ClipPdAdmin(admin.ModelAdmin):
    pass
