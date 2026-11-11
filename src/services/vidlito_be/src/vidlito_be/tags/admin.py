from django.contrib import admin

from vidlito_be.tags import models


@admin.register(models.Tag)
class TagAdmin(admin.ModelAdmin):
    pass
