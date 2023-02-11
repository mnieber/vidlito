import graphene
from clips.models import Clip
from graphene_django.types import DjangoObjectType


class ClipT(DjangoObjectType):
    class Meta:
        model = Clip

    tags = graphene.List(graphene.String)

    def resolve_tags(self, info):
        return [x for x in self.tags["tags"]]
