from django.db import models

from app.models import Entity


class UserProfile(Entity):
    user_id = models.UUIDField()
    username = models.CharField(max_length=90, unique=True)

    def __str__(self):
        return f"UserProfile: {self.username}"

    @staticmethod
    def get_mine(info):
        return UserProfile.objects.get(id=UserProfile.get_id(info))

    @staticmethod
    def get_id(info):
        return info.context.user.id
