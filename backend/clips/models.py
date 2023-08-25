from django.db import models
from django.utils.text import slugify
from martor.models import MartorField

from app.models import Entity
from app.utils.slug_seq import update_slug
from app.utils.tags import create_empty_tags
from tags.models import Tag
from user_profiles.models import UserProfile


class Clip(Entity):
    description = MartorField(null=True, blank=True)
    end_time_ms = models.IntegerField(null=True, blank=True)
    name = models.CharField(max_length=90)
    nr_of_private_playlists = models.IntegerField(default=0)
    nr_of_public_playlists = models.IntegerField(default=0)
    owner = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name="+")
    slug = models.SlugField(max_length=80, null=True, blank=True, unique=True)
    source_playlist = models.ForeignKey(
        "playlists.Playlist",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="+",
    )
    start_time_ms = models.IntegerField(null=True, blank=True)
    tags = models.JSONField(default=create_empty_tags)
    url = models.CharField(max_length=255, null=True, blank=True)

    def save(self, *args, **kwargs):
        if self.slug is None:
            self.slug = update_slug(slugify(self.name), "clip")
        super().save(*args, **kwargs)
        Tag.add_tags(self.tags['tags'])

    def __str__(self):
        return "Clip: " + str(self.name)


class ClipPd(Entity):
    clip = models.ForeignKey(Clip, on_delete=models.CASCADE, related_name="+")
    description = MartorField(null=True, blank=True)
    owner = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name="+")
    tags = models.JSONField(default=create_empty_tags)

    def __str__(self):
        return "ClipPd: " + str(self.id)
