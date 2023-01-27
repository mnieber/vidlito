from django.db import models


class UserProfile(models.Model):
    display_name = models.CharField(max_length=90)
    user_id = models.UUIDField()

    def __str__(self):
        return "UserProfile: " + str(self.id)
