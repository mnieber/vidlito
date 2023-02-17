import graphene
from actions.models import Action
from api.types import *
from playlists.models import Playlist


class GetActionsOutputs(graphene.ObjectType):
    action_set = graphene.List(ActionT)


class GetActions:
    get_actions = graphene.Field(GetActionsOutputs, playlist_slug_id=graphene.String())

    def resolve_get_actions(self, info, playlist_slug_id):
        if playlist_slug_id:
            playlist = Playlist.objects.get(**slug_id_to_args(playlist_slug_id))
            actions = Action.objects.filter(
                playlist_id=playlist.id, owner__user_id=info.context.user.id
            )
        else:
            actions = Action.objects.filter(owner__user_id=info.context.user.id)

        return GetActionsOutputs(action_set=actions)


def parse_slug_id(slug_id):
    parts = slug_id.split("/")
    return parts if len(parts) == 2 else (parts[0], None)


def slug_id_to_args(slug_id):
    slug, id = parse_slug_id(slug_id)
    return {"id": id} if id else {"slug": slug}
