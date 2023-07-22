import graphene
from graphene.types.generic import GenericScalar

from api.types import *
from app.utils.tags import create_tags
from clips.models import ClipPd
from user_profiles.models import UserProfile


class SaveClipPd(graphene.Mutation):
    success = graphene.Boolean()
    errors = GenericScalar()

    class Arguments:
        clip_id = graphene.UUID(required=True)
        clip_pd_form = ClipPdFormT(required=True)

    def mutate(self, info, clip_id, clip_pd_form):
        id = clip_pd_form.pop("id")
        clip_pd_form["tags"] = create_tags(clip_pd_form.get("tags", []))
        ClipPd.objects.update_or_create(
            defaults=clip_pd_form,
            id=id,
            clip_id=clip_id,
            owner_id=UserProfile.get_id(info),
        )

        return SaveClipPd(
            success=True,
            errors={},
        )
