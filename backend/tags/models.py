from django.db import models


class Tag(models.Model):
    tag = models.TextField(max_length=30, primary_key=True, editable=False)

    @classmethod
    def add_tags(cls, tags):
        for tag in tags:
            Tag.objects.get_or_create(tag=tag)
