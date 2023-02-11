import graphene
from graphene_django.types import DjangoObjectType

from api.types.clip_t import ClipT
from playlists.models import Playlist


class PlaylistT(DjangoObjectType):
    class Meta:
        model = Playlist
        exclude = [
            "sort_pos",
        ]

    clip_set = graphene.List(ClipT)
    tags = graphene.List(graphene.String)

    def resolve_clip_set(self, info):
        return [x.clip for x in self.entry_set.all()]

    def resolve_tags(self, info):
        return [x for x in self.tags["tags"]]

