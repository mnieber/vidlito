from django.core.management.base import BaseCommand

from vidlito_be.actions.models import Action
from vidlito_be.clips.models import Clip, ClipPd
from vidlito_be.playlists.models import Entry, Folder, Follow, Playlist, PlaylistPd


class Command(BaseCommand):
    help = "Deletes all playlists, clips, etc. Doesn't delete the user accounts"

    def handle(self, *args, **options):
        Action.objects.all().delete()
        Follow.objects.all().delete()
        Folder.objects.all().delete()
        Entry.objects.all().delete()
        Clip.objects.all().delete()
        ClipPd.objects.all().delete()
        Playlist.objects.all().delete()
        PlaylistPd.objects.all().delete()
