import graphene
from api.types import *
from clips.models import Clip
from graphene.types.generic import GenericScalar
from playlists.models import create_tags


class SaveClip(graphene.Mutation):
    success = graphene.Boolean()
    errors = GenericScalar()

    class Arguments:
        clip_form = ClipFormT()

    def mutate(self, info, clip_form):
        id = clip_form.pop("id")
        clip_form["tags"] = create_tags(clip_form["tags"])
        clip, created = Clip.objects.update_or_create(defaults=clip_form, id=id)

        return SaveClip(
            success=True,
            errors={},
        )
