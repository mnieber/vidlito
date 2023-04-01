import graphene
from graphene.types.generic import GenericScalar

from actions.models import Action
from api.types import *
from playlists.models import Entry, Playlist


class UndoAction(graphene.Mutation):
    success = graphene.Boolean()
    errors = GenericScalar()

    class Arguments:
        action_id = graphene.UUID(required=True)

    def mutate(self, info, action_id):
        action = Action.objects.get(id=action_id, owner__user_id=info.context.user.id)
        if action.type == "TrashEntries":
            playlist_id = action.data["playlist_id"]
            clip_ids = action.data["clip_ids"]
            for entry in Entry.objects.trash().filter(
                playlist_id=playlist_id, clip_id__in=clip_ids
            ):
                entry.is_deleted = False
                entry.save()
            action.delete()

        return UndoAction(
            success=True,
            errors={},
        )
