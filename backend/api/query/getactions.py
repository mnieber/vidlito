import math

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

    def resolve_get_actions(self, info, playlist_id=None, page=0, page_size=10):
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

        start_idx = page * page_size
        end_idx = start_idx + page_size
        return GetActionsOutputs(
            action_set=actions[start_idx:end_idx],
            pagination=PaginationT(
                nr_of_pages=math.ceil(actions.count() / page_size),
                page=0,
                page_size=page_size,
            ),
        )
