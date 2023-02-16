from django.db import models

from app.models import Entity


class UserProfile(Entity):
    display_name = models.CharField(max_length=90)
    user_id = models.UUIDField()

    def __str__(self):
        return "UserProfile: " + str(self.display_name)

    @staticmethod
    def get(info):
        return UserProfile.objects.get(user_id=info.context.user.id)
