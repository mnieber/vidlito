from app.models import Entity
from django.db import models
from user_profiles.models import UserProfile


class Action(Entity):
    data = models.JSONField()
    owner = models.ForeignKey(
        UserProfile, on_delete=models.CASCADE, related_name="action_set"
    )
    type = models.TextField()

    def __str__(self):
        return "Action: " + str(self.id)
