from django.db import models
from django.utils.text import slugify
from martor.models import MartorField

from app.models import Entity


def create_empty_tags():
    return dict(tags={})


class Clip(Entity):
    description = MartorField(null=True, blank=True)
    end_time_ms = models.IntegerField(null=True, blank=True)
    name = models.CharField(max_length=90)
    slug = models.SlugField(max_length=80, null=True, blank=True)
    start_time_ms = models.IntegerField(null=True, blank=True)
    tags = models.JSONField(default=create_empty_tags)
    url = models.CharField(max_length=255, null=True, blank=True)

    def save(self, *args, **kwargs):
        if self.slug is None:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return "Clip: " + str(self.name)
