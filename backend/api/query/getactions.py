import graphene

from actions.models import Action
from api.types import *
from playlists.models import Playlist


class GetActionsOutputs(graphene.ObjectType):
    action_set = graphene.List(ActionT)


class GetActions:
    get_actions = graphene.Field(
        GetActionsOutputs,
        playlist_id=graphene.String(),
        playlist_slug=graphene.String(),
    )

    def resolve_get_actions(self, info, playlist_id=None, playlist_slug=None):
        if playlist_slug or playlist_id:
            playlist = Playlist.objects.get(**_get_args(playlist_slug, playlist_id))
            actions = Action.objects.filter(
                playlist_id=playlist.id, owner__user_id=info.context.user.id
            )
        else:
            actions = Action.objects.filter(owner__user_id=info.context.user.id)

        return GetActionsOutputs(action_set=actions)


def _get_args(slug, id):
    return {"id": id} if id else {"slug": slug}
