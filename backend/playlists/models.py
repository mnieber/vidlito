from app.models import Entity
from clips.models import Clip
from django.db import models
from django.utils.text import slugify
from martor.models import MartorField
from user_profiles.models import UserProfile


def create_empty_tags():
    return dict(tags=[])


class Playlist(Entity):
    class Meta:
        ordering = ["sort_pos"]

    description = MartorField(null=True, blank=True)
    name = models.CharField(max_length=90)
    owner = models.ForeignKey(
        UserProfile, on_delete=models.CASCADE, related_name="playlist_set"
    )
    slug = models.SlugField(max_length=80, null=True, blank=True, unique=True)
    sort_pos = models.IntegerField(default=0)
    tags = models.JSONField(default=create_empty_tags)

    def save(self, *args, **kwargs):
        if self.slug is None:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return "Playlist: " + str(self.name)


class EntryManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(is_deleted=False)

    def trash(self):
        return super().get_queryset().filter(is_deleted=True)

    def all(self):
        return super().get_queryset().filter()


class Entry(Entity):
    class Meta:
        ordering = ["sort_pos"]
        verbose_name_plural = "entries"

    objects = EntryManager()

    clip = models.ForeignKey(Clip, on_delete=models.CASCADE, related_name="+")
    is_deleted = models.BooleanField(default=False)
    playlist = models.ForeignKey(
        Playlist, on_delete=models.CASCADE, related_name="entry_set"
    )
    sort_pos = models.IntegerField(default=0)

    def __str__(self):
        return f"Entry: {self.playlist.name} / {self.clip.name}"
