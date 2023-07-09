import graphene
from graphene_django.types import DjangoObjectType

from playlists.models import PlaylistPD


class PlaylistPDT(DjangoObjectType):
    class Meta:
        model = PlaylistPD

    tags = graphene.List(graphene.String)

    def resolve_tags(self, info):
        return [x for x in self.tags["tags"]]
