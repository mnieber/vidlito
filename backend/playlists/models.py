from django.db import models
from django.utils.text import slugify
from martor.models import MartorField

from app.models import Entity
from clips.models import Clip
from user_profiles.models import UserProfile


class Playlist(Entity):
    class Meta:
        ordering = ["sort_pos"]

    description = MartorField(null=True, blank=True)
    name = models.CharField(max_length=90)
    owner = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name="+")
    slug = models.SlugField(max_length=80, null=True, blank=True, unique=True)
    sort_pos = models.IntegerField(default=0)

    def save(self, *args, **kwargs):
        if self.slug is None:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return "Playlist: " + str(self.name)


class Entry(Entity):
    class Meta:
        ordering = ["sort_pos"]
        verbose_name_plural = "entries"

    clip = models.ForeignKey(Clip, on_delete=models.CASCADE, related_name="+")
    playlist = models.ForeignKey(
        Playlist, on_delete=models.CASCADE, related_name="entry_set"
    )
    sort_pos = models.IntegerField(default=0)

    def __str__(self):
        return f"Entry: {self.playlist.name} / {self.clip.name}"
