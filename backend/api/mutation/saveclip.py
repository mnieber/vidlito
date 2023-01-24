import graphene
from api.types import *
from clips.models import Clip
from graphene.types.generic import GenericScalar


class SaveClip(graphene.Mutation):
    success = graphene.Boolean()
    errors = GenericScalar()

    class Arguments:
        clip_form = ClipFormT()

    def mutate(self, info, clip_form):
        slug = clip_form.pop("slug")
        clip, created = Clip.objects.update_or_create(defaults=clip_form, slug=slug)

        return SaveClip(
            success=True,
            errors={},
        )
