import graphene

import user_accounts.schema

from .deleteclips import DeleteClips
from .deletefolder import DeleteFolder
from .deleteplaylist import DeletePlaylist
from .followplaylist import FollowPlaylist
from .moveclipstoplaylist import MoveClipsToPlaylist
from .moveclipstotrash import MoveClipsToTrash
from .saveclip import SaveClip
from .saveclipordering import SaveClipOrdering
from .saveclippd import SaveClipPD
from .savefolder import SaveFolder
from .saveplaylist import SavePlaylist
from .saveplaylistordering import SavePlaylistOrdering
from .saveplaylistpd import SavePlaylistPD
from .searchcontent import SearchContent
from .undoaction import UndoAction
from .updatelasturl import UpdateLastUrl


class GrapheneNonEmptyMutation(graphene.Mutation):
    test_mutation = graphene.Field(graphene.String)

    def mutate(self, info, **kwargs):
        return GrapheneNonEmptyMutation(test_mutation="Hello world")


class Mutation(user_accounts.schema.Mutation, GrapheneNonEmptyMutation):
    delete_clips = DeleteClips.Field()
    delete_folder = DeleteFolder.Field()
    delete_playlist = DeletePlaylist.Field()
    follow_playlist = FollowPlaylist.Field()
    move_clips_to_playlist = MoveClipsToPlaylist.Field()
    move_clips_to_trash = MoveClipsToTrash.Field()
    save_clip = SaveClip.Field()
    save_clip_p_d = SaveClipPD.Field()
    save_clip_ordering = SaveClipOrdering.Field()
    save_folder = SaveFolder.Field()
    save_playlist = SavePlaylist.Field()
    save_playlist_p_d = SavePlaylistPD.Field()
    save_playlist_ordering = SavePlaylistOrdering.Field()
    search_content = SearchContent.Field()
    undo_action = UndoAction.Field()
    update_last_url = UpdateLastUrl.Field()
