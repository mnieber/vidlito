import graphene

import user_accounts.schema

from .get_clip_p_d import GetClipPD
from .get_playlist_p_d import GetPlaylistPD
from .getactions import GetActions
from .getplaylist import GetPlaylist
from .gettags import GetTags
from .getuserprofile import GetUserProfile


class GrapheneNonEmptyQuery(graphene.ObjectType):
    test_query = graphene.Field(graphene.String)

    def resolve_test_query(self, info, **kwargs):
        return "Hello world"


class Query(
    user_accounts.schema.Query,
    GetActions,
    GetTags,
    GetPlaylist,
    GetClipPD,
    GetPlaylistPD,
    GetUserProfile,
    GrapheneNonEmptyQuery,
):
    pass
