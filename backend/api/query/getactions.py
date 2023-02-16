import graphene
from actions.models import Action
from api.types import *
from playlists.models import Playlist


class GetActionsOutputs(graphene.ObjectType):
    action_set = graphene.List(ActionT)


class GetActions:
    get_actions = graphene.Field(GetActionsOutputs, playlist_slug=graphene.String())

    def resolve_get_actions(self, info, playlist_slug):
        if playlist_slug:
            playlist = Playlist.objects.get(slug=playlist_slug)
            actions = Action.objects.filter(
                playlist_id=playlist.id, owner__user_id=info.context.user.id
            )
        else:
            actions = Action.objects.filter(owner__user_id=info.context.user.id)

        return GetActionsOutputs(action_set=actions)
