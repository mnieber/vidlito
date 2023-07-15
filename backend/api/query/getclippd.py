import graphene

from api.types import *
from clips.models import ClipPd


class GetClipPdOutputs(graphene.ObjectType):
    clip_pd = graphene.Field(ClipPdT)


class GetClipPd:
    get_clip_pd = graphene.Field(
        GetClipPdOutputs,
        clip_slug=graphene.String(),
    )

    def resolve_get_clip_pd(self, info, clip_slug):
        clip_pd = ClipPd.filter(info, clip__slug=clip_slug).first()
        return GetClipPdOutputs(
            clip_pd=clip_pd,
        )
