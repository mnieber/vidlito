import graphene

import user_accounts.schema

from .deleteclips import DeleteClips
from .deleteplaylist import DeletePlaylist
from .followplaylist import FollowPlaylist
from .moveclipstoplaylist import MoveClipsToPlaylist
from .moveclipstotrash import MoveClipsToTrash
from .saveclip import SaveClip
from .saveclip_p_d import SaveClipPD
from .saveclipordering import SaveClipOrdering
from .saveplaylist import SavePlaylist
from .saveplaylist_p_d import SavePlaylistPD
from .saveplaylistordering import SavePlaylistOrdering
from .searchcontent import SearchContent
from .undoaction import UndoAction
from .updatelasturl import UpdateLastUrl


class GrapheneNonEmptyMutation(graphene.Mutation):
    test_mutation = graphene.Field(graphene.String)

    def mutate(self, info, **kwargs):
        return GrapheneNonEmptyMutation(test_mutation="Hello world")


class Mutation(user_accounts.schema.Mutation, GrapheneNonEmptyMutation):
    delete_clips = DeleteClips.Field()
    search_content = SearchContent.Field()
    delete_playlist = DeletePlaylist.Field()
    follow_playlist = FollowPlaylist.Field()
    move_clips_to_trash = MoveClipsToTrash.Field()
    move_clips_to_playlist = MoveClipsToPlaylist.Field()
    save_clip = SaveClip.Field()
    save_clip_p_d = SaveClipPD.Field()
    save_clip_ordering = SaveClipOrdering.Field()
    save_playlist = SavePlaylist.Field()
    save_playlist_p_d = SavePlaylistPD.Field()
    save_playlist_ordering = SavePlaylistOrdering.Field()
    undo_action = UndoAction.Field()
    update_last_url = UpdateLastUrl.Field()
