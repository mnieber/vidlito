import graphene

import user_accounts.schema

from .deleteclips import DeleteClips
from .deleteplaylist import DeletePlaylist
from .saveclip import SaveClip
from .saveclipordering import SaveClipOrdering
from .saveplaylist import SavePlaylist
from .saveplaylistordering import SavePlaylistOrdering


class GrapheneNonEmptyMutation(graphene.Mutation):
    test_mutation = graphene.Field(graphene.String)

    def mutate(self, info, **kwargs):
        return GrapheneNonEmptyMutation(test_mutation="Hello world")


class Mutation(user_accounts.schema.Mutation, GrapheneNonEmptyMutation):
    delete_clips = DeleteClips.Field()
    delete_playlist = DeletePlaylist.Field()
    save_clip = SaveClip.Field()
    save_clip_ordering = SaveClipOrdering.Field()
    save_playlist = SavePlaylist.Field()
    save_playlist_ordering = SavePlaylistOrdering.Field()
