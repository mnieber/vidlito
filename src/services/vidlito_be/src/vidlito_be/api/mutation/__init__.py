import graphene

from vidlito_be.user_accounts import schema as user_accounts_schema

from .deleteclips import DeleteClips
from .deletefolders import DeleteFolders
from .deleteplaylists import DeletePlaylists
from .followplaylists import FollowPlaylists
from .moveclipstoplaylist import MoveClipsToPlaylist
from .moveclipstotrash import MoveClipsToTrash
from .saveclip import SaveClip
from .saveclipordering import SaveClipOrdering
from .saveclippd import SaveClipPd
from .savefolder import SaveFolder
from .saveplaylist import SavePlaylist
from .saveplaylistordering import SavePlaylistOrdering
from .saveplaylistpd import SavePlaylistPd
from .saveplaylistsettings import SavePlaylistSettings
from .undoaction import UndoAction


class GrapheneNonEmptyMutation(graphene.Mutation):
    test_mutation = graphene.Field(graphene.String)

    def mutate(self, info, **kwargs):
        return GrapheneNonEmptyMutation(test_mutation="Hello world")


class Mutation(user_accounts_schema.Mutation, GrapheneNonEmptyMutation):
    delete_clips = DeleteClips.Field()
    delete_folders = DeleteFolders.Field()
    delete_playlists = DeletePlaylists.Field()
    follow_playlists = FollowPlaylists.Field()
    move_clips_to_playlist = MoveClipsToPlaylist.Field()
    move_clips_to_trash = MoveClipsToTrash.Field()
    save_clip = SaveClip.Field()
    save_clip_pd = SaveClipPd.Field()
    save_clip_ordering = SaveClipOrdering.Field()
    save_folder = SaveFolder.Field()
    save_playlist = SavePlaylist.Field()
    save_playlist_settings = SavePlaylistSettings.Field()
    save_playlist_ordering = SavePlaylistOrdering.Field()
    save_playlist_pd = SavePlaylistPd.Field()
    undo_action = UndoAction.Field()
