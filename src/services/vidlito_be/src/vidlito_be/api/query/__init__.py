import graphene

from vidlito_be.user_accounts import schema as user_accounts_schema

from .getactions import GetActions
from .getclippd import GetClipPd
from .getplaylist import GetPlaylist
from .gettags import GetTags
from .getuserprofile import GetUserProfile
from .searchcontent import SearchContent


class GrapheneNonEmptyQuery(graphene.ObjectType):
    test_query = graphene.Field(graphene.String)

    def resolve_test_query(self, info, **kwargs):
        return "Hello world"


class Query(
    user_accounts_schema.Query,
    GetActions,
    GetClipPd,
    GetPlaylist,
    GetTags,
    GetUserProfile,
    SearchContent,
    GrapheneNonEmptyQuery,
):
    pass
