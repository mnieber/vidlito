import graphene

from actions.models import Action
from api.types import *
from playlists.models import Playlist


class GetActionsOutputs(graphene.ObjectType):
    action_set = graphene.List(ActionT)


class GetActions:
    get_actions = graphene.Field(GetActionsOutputs, playlist_id=graphene.UUID())

    def resolve_get_actions(self, info, playlist_id=None):
        if playlist_id:
            playlist = Playlist.objects.filter(id=playlist_id).first()
            actions = (
                Action.objects.filter(
                    playlist_id=playlist.id, owner__user_id=info.context.user.id
                )
                if playlist
                else []
            )
        else:
            actions = Action.objects.filter(owner__user_id=info.context.user.id)

        print("GetActions", playlist_id, actions)
        return GetActionsOutputs(action_set=actions)
