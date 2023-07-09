import graphene
from graphene.types.generic import GenericScalar

from api.types import *
from app.utils.tags import create_tags
from clips.models import ClipPD
from user_profiles.models import UserProfile


class SaveClipPD(graphene.Mutation):
    success = graphene.Boolean()
    errors = GenericScalar()

    class Arguments:
        clip_id = graphene.UUID(required=True)
        clip_p_d_form = ClipPDFormT(required=True)

    def mutate(self, info, clip_id, clip_p_d_form):
        user_profile = UserProfile.get(info)
        id = clip_p_d_form.pop("id")
        clip_p_d_form["tags"] = create_tags(clip_p_d_form.get("tags", []))
        ClipPD.objects.update_or_create(
            defaults=clip_p_d_form, id=id, clip_id=clip_id, owner=user_profile
        )

        return SaveClipPD(
            success=True,
            errors={},
        )
