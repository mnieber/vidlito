from django.db import models
from django.utils.text import slugify
from martor.models import MartorField

from app.models import Entity
from app.utils.slug_seq import update_slug
from app.utils.tags import create_empty_tags
from clips.models import Clip
from tags.models import Tag
from user_profiles.models import UserProfile


class Playlist(Entity):
    class Meta:
        ordering = ["sort_pos"]

    description = MartorField(null=True, blank=True)
    name = models.CharField(max_length=90)
    owner = models.ForeignKey(
        UserProfile, on_delete=models.CASCADE, related_name="owned_playlist_set"
    )
    slug = models.SlugField(max_length=80, null=True, blank=True, unique=True)
    sort_pos = models.IntegerField(default=0)
    tags = models.JSONField(default=create_empty_tags)
    nr_of_clips = models.IntegerField(default=0)
    is_public = models.BooleanField(default=False)

    def update_nr_clips(self):
        self.nr_of_clips = self.entry_set.count()
        self.save()

    def save(self, *args, **kwargs):
        if self.slug is None:
            self.slug = slugify(self.name)
        existing_playlist = (
            Playlist.objects.filter(id=self.id).first() if self.id else None
        )
        if not (existing_playlist and existing_playlist.slug == self.slug):
            self.slug = update_slug(self.slug, "playlist")
        super().save(*args, **kwargs)
        Tag.add_tags(self.tags)

    def __str__(self):
        return "Playlist: " + str(self.name)


class EntryManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(is_deleted=False)

    def trash(self):
        return super().get_queryset().filter(is_deleted=True)

    def raw(self):
        return super().get_queryset().filter()


class Entry(Entity):
    class Meta:
        ordering = ["sort_pos"]
        verbose_name_plural = "entries"

    objects = EntryManager()

    clip = models.ForeignKey(
        Clip, on_delete=models.CASCADE, related_name="+", db_index=True
    )
    is_deleted = models.BooleanField(default=False)
    playlist = models.ForeignKey(
        Playlist, on_delete=models.CASCADE, related_name="entry_set", db_index=True
    )
    sort_pos = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.playlist.name} / {self.clip.name}"

    def __str__(self):
        return f"{self.playlist.owner.username} / {self.playlist.name}"


class PlaylistPd(Entity):
    description = MartorField(null=True, blank=True)
    owner = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name="+")
    playlist = models.ForeignKey(Playlist, on_delete=models.CASCADE, related_name="+")
    tags = models.JSONField(default=create_empty_tags)


class Folder(Entity):
    class Meta:
        ordering = ["sort_pos"]

    name = models.CharField(max_length=90)
    owner = models.ForeignKey(
        UserProfile, on_delete=models.CASCADE, related_name="folder_set"
    )
    parent_folder = models.ForeignKey(
        "Folder", on_delete=models.CASCADE, related_name="+", null=True, blank=True
    )
    sort_pos = models.IntegerField(default=0)

    def __str__(self):
        return "Folder: " + str(self.name)


class Follow(Entity):
    class Meta:
        ordering = ["sort_pos"]

    folder = models.ForeignKey(
        Folder, on_delete=models.CASCADE, null=True, blank=True, related_name="+"
    )
    playlist = models.ForeignKey(Playlist, on_delete=models.CASCADE, related_name="+")
    sort_pos = models.IntegerField(default=0)
    owner = models.ForeignKey(
        UserProfile, on_delete=models.CASCADE, related_name="follow_set"
    )
