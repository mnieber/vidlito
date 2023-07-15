import graphene
from graphene_django.types import DjangoObjectType

from clips.models import ClipPd


class ClipPdT(DjangoObjectType):
    class Meta:
        model = ClipPd
        exclude = ["owner"]

    tags = graphene.List(graphene.String)

    def resolve_tags(self, info):
        return [x for x in self.tags["tags"]]
