import graphene
from graphene_django.types import DjangoObjectType

from clips.models import Clip


class ClipT(DjangoObjectType):
    class Meta:
        model = Clip

    tags = graphene.List(graphene.String)

    def resolve_tags(self, info):
        return [x for x in self.tags["tags"]]
