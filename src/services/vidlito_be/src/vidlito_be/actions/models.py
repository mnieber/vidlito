from django.db import models

from vidlito_be.app.models import Entity
from vidlito_be.user_profiles.models import UserProfile


class Action(Entity):
    data = models.JSONField()
    owner = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name="+")
    playlist_id = models.UUIDField(null=True, blank=True)
    type = models.CharField(
        max_length=20,
        choices=[("TrashEntries", "TrashEntries"), ("TrashPlaylist", "TrashPlaylist")],
    )

    def __str__(self):
        return f"Action: {self.id}"
