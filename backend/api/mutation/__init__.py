import graphene

import user_accounts.schema

from .deleteclips import DeleteClips
from .deleteplaylist import DeletePlaylist
from .saveclip import SaveClip
from .saveclipordering import SaveClipOrdering
from .saveplaylist import SavePlaylist


class GrapheneNonEmptyMutation(graphene.Mutation):
    test_mutation = graphene.Field(graphene.String)

    def mutate(self, info, **kwargs):
        return GrapheneNonEmptyMutation(test_mutation="Hello world")


class Mutation(user_accounts.schema.Mutation, GrapheneNonEmptyMutation):
    save_clip_ordering = SaveClipOrdering.Field()
    delete_playlist = DeletePlaylist.Field()
    delete_clips = DeleteClips.Field()
    save_clip = SaveClip.Field()
    save_playlist = SavePlaylist.Field()
