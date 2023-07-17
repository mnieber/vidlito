import graphene
from graphene_django.types import DjangoObjectType

from api.types.clip_t import ClipT
from playlists.models import Playlist


class PlaylistT(DjangoObjectType):
    class Meta:
        model = Playlist
        exclude = [
            "sort_pos",
            "owner",
            "entry_set",
        ]

    clip_set = graphene.List(ClipT)
    owner_username = graphene.String()
    tags = graphene.List(graphene.String)

    def resolve_clip_set(self, info):
        return [
            x.clip for x in self.entry_set.filter(clip__nr_of_public_playlists__gt=0)
        ]

    def resolve_owner_username(self, info):
        return self.owner.username

    def resolve_tags(self, info):
        return [x for x in self.tags["tags"]]
