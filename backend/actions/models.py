from django.db import models

from app.models import Entity
from user_profiles.models import UserProfile


class Action(Entity):
    data = models.JSONField()
    owner = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name="+")
    playlist_id = models.UUIDField(null=True, blank=True)
    teaser = models.TextField()
    type = models.CharField(
        max_length=20,
        choices=[("TrashEntries", "TrashEntries"), ("TrashPlaylist", "TrashPlaylist")],
    )

    def __str__(self):
        return "Action: " + str(self.id)
