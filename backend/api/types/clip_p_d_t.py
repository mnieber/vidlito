import graphene
from graphene_django.types import DjangoObjectType

from clips.models import ClipPD


class ClipPDT(DjangoObjectType):
    class Meta:
        model = ClipPD

    tags = graphene.List(graphene.String)

    def resolve_tags(self, info):
        return [x for x in self.tags["tags"]]
