from app.models import Entity
from django.db import models
from django.utils.text import slugify
from martor.models import MartorField


class Clip(Entity):
    description = MartorField(null=True, blank=True)
    name = models.CharField(max_length=90)
    slug = models.SlugField(max_length=80, null=True, blank=True, unique=True)

    def save(self, *args, **kwargs):
        if self.slug is None:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return "Clip: " + self.name
