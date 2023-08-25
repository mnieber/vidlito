import graphene
from graphene_django.types import DjangoObjectType

from playlists.models import PlaylistPd


class PlaylistPdT(DjangoObjectType):
    class Meta:
        model = PlaylistPd
        exclude = [
            "owner",
        ]

    owner_username = graphene.String()
    tags = graphene.List(graphene.String)

    def resolve_owner_username(self, info):
        return self.owner.username

    def resolve_tags(self, info):
        return [x for x in self.tags["tags"]]
