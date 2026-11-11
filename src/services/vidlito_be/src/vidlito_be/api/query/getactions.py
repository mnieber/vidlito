import graphene

from vidlito_be.actions.models import Action
from vidlito_be.api.types import *
from vidlito_be.playlists.models import Playlist


class GetActionsOutputs(graphene.ObjectType):
    action_set = graphene.List(ActionT)
    pagination = graphene.Field(PaginationT)


class GetActions:
    get_actions = graphene.Field(
        GetActionsOutputs,
        playlist_id=graphene.UUID(),
        page=graphene.Int(required=True),
        page_size=graphene.Int(required=True),
    )

    def resolve_get_actions(self, info, playlist_id=None, page=1, page_size=10):
        if playlist_id:
            playlist = Playlist.objects.filter(id=playlist_id).first()

            actions = (
                Action.filter_mine(info, playlist_id=playlist.id)
                if playlist
                else Action.objects.none()
            )
        else:
            actions = Action.filter_mine(info)

        pagination = create_pagination(
            page=page,
            page_size=page_size,
            nr_of_items=actions.count(),
        )

        return GetActionsOutputs(
            action_set=actions[pagination.start_idx : pagination.end_idx],
            pagination=pagination,
        )


def create_pagination(page, page_size, nr_of_items):
    page_idx = page - 1
    start_idx = page_idx * page_size
    end_idx = min(start_idx + page_size, nr_of_items)
    return PaginationT(
        page=page,
        nr_of_items=nr_of_items,
        page_size=page_size,
        start_idx=start_idx,
        end_idx=end_idx,
    )
