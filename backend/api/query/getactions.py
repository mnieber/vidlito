import graphene
from actions.models import Action
from api.types import *


class GetActionsOutputs(graphene.ObjectType):
    action_set = graphene.List(ActionT)


class GetActions:
    get_actions = graphene.Field(GetActionsOutputs, playlist_id=graphene.ID())

    def resolve_get_actions(self, info, playlist_id):
        if playlist_id:
            actions = Action.objects.filter(
                playlist_id=playlist_id, owner__user_id=info.context.user.id
            )
        else:
            actions = Action.objects.filter(owner__user_id=info.context.user.id)

        return GetActionsOutputs(action_set=actions)
