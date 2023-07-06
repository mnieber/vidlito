import graphene

from api.types import *
from tags.models import Tag


class GetTagsOutputs(graphene.ObjectType):
    tags = graphene.List(graphene.String)


class GetTags:
    get_tags = graphene.Field(
        GetTagsOutputs,
        tag_prefix=graphene.String(),
    )

    def resolve_get_tags(self, info, tag_prefix):
        tags = [x.tag for x in Tag.objects.filter(tag__startswith=tag_prefix)]
        return GetTagsOutputs(tags=tags)
