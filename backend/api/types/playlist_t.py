import graphene
from api.types.clip_t import ClipT
from graphene_django.types import DjangoObjectType
from playlists.models import Playlist


class PlaylistT(DjangoObjectType):
    class Meta:
        model = Playlist
        exclude = [
            "sort_pos",
        ]

    clip_set = graphene.List(ClipT)

    def resolve_clip_set(self, info):
        return [x.clip for x in self.entry_set.all()]
