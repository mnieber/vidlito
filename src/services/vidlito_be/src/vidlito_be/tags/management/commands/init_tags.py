from django.core.management.base import BaseCommand

from vidlito_be.clips.models import Clip
from vidlito_be.playlists.models import Playlist
from vidlito_be.tags.models import Tag


class Command(BaseCommand):
    def handle(self, *args, **options):
        for clip in Clip.objects.all():
            Tag.add_tags(clip.tags["tags"])

        for playlist in Playlist.objects.all():
            Tag.add_tags(playlist.tags["tags"])
