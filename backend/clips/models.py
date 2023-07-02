from django.db import models
from django.utils.text import slugify
from martor.models import MartorField

from app.models import Entity
from app.utils.slug_seq import update_slug
from playlists.models import Playlist
from user_profiles.models import UserProfile


def create_empty_tags():
    return dict(tags=[])


class Clip(Entity):
    description = MartorField(null=True, blank=True)
    end_time_ms = models.IntegerField(null=True, blank=True)
    name = models.CharField(max_length=90)
    owner = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name="+")
    source_playlist = models.ForeignKey(
        Playlist, on_delete=models.SET_NULL, null=True, blank=True, related_name="+"
    )
    slug = models.SlugField(max_length=80, null=True, blank=True, unique=True)
    start_time_ms = models.IntegerField(null=True, blank=True)
    tags = models.JSONField(default=create_empty_tags)
    url = models.CharField(max_length=255, null=True, blank=True)

    def save(self, *args, **kwargs):
        if self.slug is None:
            self.slug = slugify(self.name)
        existing_clip = Clip.objects.filter(id=self.id).first() if self.id else None
        if not (existing_clip and existing_clip.slug == self.slug):
            self.slug = update_slug(self.slug, "clip")
        super().save(*args, **kwargs)

    def __str__(self):
        return "Clip: " + str(self.name)
