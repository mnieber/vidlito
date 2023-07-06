import graphene

from api.types import *
from clips.models import ClipPD


class GetClipPDOutputs(graphene.ObjectType):
    clip_p_d = graphene.Field(ClipPDT)


class GetClipPD:
    get_clip_p_d = graphene.Field(
        GetClipPDOutputs,
        clip_slug=graphene.String(),
    )

    def resolve_get_clip_p_d(self, info, clip_slug):
        clip_p_d = ClipPD.objects.filter(
            owner__user_id=info.context.user.id, clip__slug=clip_slug
        ).first()
        return GetClipPDOutputs(
            clip_p_d=clip_p_d,
        )
