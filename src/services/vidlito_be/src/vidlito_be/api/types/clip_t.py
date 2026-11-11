import graphene
from graphene_django.types import DjangoObjectType

from vidlito_be.clips.models import Clip


class ClipT(DjangoObjectType):
    class Meta:
        model = Clip
        exclude = [
            "owner",
            "source_playlist",
        ]

    owner_username = graphene.String()
    tags = graphene.List(graphene.String)

    def resolve_owner_username(self, info):
        return self.owner.username

    def resolve_tags(self, info):
        return [x for x in self.tags["tags"]]
