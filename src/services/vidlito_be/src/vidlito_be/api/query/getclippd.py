import graphene

from vidlito_be.api.types import *
from vidlito_be.clips.models import ClipPd


class GetClipPdOutputs(graphene.ObjectType):
    clip_pd = graphene.Field(ClipPdT)


class GetClipPd:
    get_clip_pd = graphene.Field(
        GetClipPdOutputs, clip_slug=graphene.String(required=True)
    )

    def resolve_get_clip_pd(self, info, clip_slug):
        clip_pd = ClipPd.filter_mine(info, clip__slug=clip_slug).first()
        return GetClipPdOutputs(
            clip_pd=clip_pd,
        )
