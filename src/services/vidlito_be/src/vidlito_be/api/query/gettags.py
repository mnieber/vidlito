import graphene

from vidlito_be.api.types import *
from vidlito_be.tags.models import Tag


class GetTagsOutputs(graphene.ObjectType):
    tags = graphene.List(graphene.String)


class GetTags:
    get_tags = graphene.Field(
        GetTagsOutputs,
        tag_prefix=graphene.String(required=True),
        max_nr_of_tags=graphene.Int(required=True),
    )

    def resolve_get_tags(self, info, tag_prefix, max_nr_of_tags):
        tags = [x.tag for x in Tag.objects.filter(tag__istartswith=tag_prefix)][
            :max_nr_of_tags
        ]
        return GetTagsOutputs(tags=tags)
