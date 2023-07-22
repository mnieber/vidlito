import uuid

from django.db import models


class Entity(models.Model):
    class Meta:
        abstract = True
        ordering = ["-created"]

    created = models.DateTimeField(auto_now_add=True)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    # version = models.BigIntegerField(default=0, editable=False)

    @classmethod
    def get_mine(cls, info, *args, **kwargs):
        return cls.objects.get(*args, owner_id=info.context.user.id, **kwargs)

    @classmethod
    def filter_mine(cls, info, *args, **kwargs):
        return cls.objects.filter(*args, owner_id=info.context.user.id, **kwargs)


class SlugSequence(models.Model):
    id = models.SlugField(primary_key=True, unique=True)
    sequence = models.IntegerField(default=1)
