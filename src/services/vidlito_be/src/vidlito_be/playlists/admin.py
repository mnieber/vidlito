from adminsortable2.admin import SortableAdminBase, SortableInlineAdminMixin
from django.contrib import admin

from vidlito_be.playlists import models


class EntryInline(SortableInlineAdminMixin, admin.TabularInline):
    model = models.Entry
    extra = 3


class FollowInline(SortableInlineAdminMixin, admin.TabularInline):
    model = models.Follow
    extra = 3


@admin.register(models.Playlist)
class PlaylistAdmin(SortableAdminBase, admin.ModelAdmin):
    inlines = (EntryInline,)


@admin.register(models.Entry)
class EntryAdmin(admin.ModelAdmin):
    pass


@admin.register(models.PlaylistPd)
class PlaylistPdAdmin(admin.ModelAdmin):
    pass


@admin.register(models.Folder)
class FolderAdmin(admin.ModelAdmin):
    pass


@admin.register(models.Follow)
class FollowAdmin(admin.ModelAdmin):
    pass
