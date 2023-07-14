from django.db import models

from app.models import Entity


class UserProfile(Entity):
    username = models.CharField(max_length=90)
    user_id = models.UUIDField()
    last_url = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return "UserProfile: " + str(self.username)

    @staticmethod
    def get(info):
        return UserProfile.get(info)
