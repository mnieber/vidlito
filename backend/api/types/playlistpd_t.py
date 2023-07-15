import graphene
from graphene_django.types import DjangoObjectType

from playlists.models import PlaylistPd


class PlaylistPdT(DjangoObjectType):
    class Meta:
        model = PlaylistPd
        exclude = ["owner"]

    tags = graphene.List(graphene.String)
    owner_username = graphene.String()

    def resolve_tags(self, info):
        return [x for x in self.tags["tags"]]

    def resolve_owner_username(self, info):
        return self.owner.username
