import graphene

from actions.models import Action
from api.types import *
from playlists.models import Playlist


class GetActionsOutputs(graphene.ObjectType):
    action_set = graphene.List(ActionT)
    pagination = graphene.Field(PaginationT)


class GetActions:
    get_actions = graphene.Field(
        GetActionsOutputs,
        playlist_id=graphene.UUID(),
        page=graphene.Int(),
        page_size=graphene.Int(),
    )

    def resolve_get_actions(self, info, playlist_id=None, page=1, page_size=10):
        if playlist_id:
            playlist = Playlist.objects.filter(id=playlist_id).first()

            actions = (
                Action.filter(info, playlist_id=playlist.id)
                if playlist
                else Action.objects.none()
            )
        else:
            actions = Action.filter(info)

        page_idx = page - 1
        start_idx = page_idx * page_size
        end_idx = start_idx + page_size
        return GetActionsOutputs(
            action_set=actions[start_idx:end_idx],
            pagination=PaginationT(
                nr_of_items=actions.count(),
                page=page,
                page_size=page_size,
            ),
        )
