import graphene
from graphene_django.types import DjangoObjectType

from vidlito_be.clips.models import ClipPd


class ClipPdT(DjangoObjectType):
    class Meta:
        model = ClipPd
        exclude = [
            "clip",
            "owner",
        ]

    tags = graphene.List(graphene.String)

    def resolve_tags(self, info):
        return [x for x in self.tags["tags"]]
