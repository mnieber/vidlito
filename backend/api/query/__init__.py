import graphene

import user_accounts.schema

from .getactions import GetActions
from .getclippd import GetClipPD
from .getplaylist import GetPlaylist
from .getplaylistpd import GetPlaylistPD
from .gettags import GetTags
from .getuserprofile import GetUserProfile


class GrapheneNonEmptyQuery(graphene.ObjectType):
    test_query = graphene.Field(graphene.String)

    def resolve_test_query(self, info, **kwargs):
        return "Hello world"


class Query(
    user_accounts.schema.Query,
    GetActions,
    GetClipPD,
    GetPlaylist,
    GetPlaylistPD,
    GetTags,
    GetUserProfile,
    GrapheneNonEmptyQuery,
):
    pass
