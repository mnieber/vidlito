import graphene

import user_accounts.schema

from .getplaylist import GetPlaylist
from .getuserprofile import GetUserProfile


class GrapheneNonEmptyQuery(graphene.ObjectType):
    test_query = graphene.Field(graphene.String)

    def resolve_test_query(self, info, **kwargs):
        return "Hello world"


class Query(
    user_accounts.schema.Query, GetPlaylist, GetUserProfile, GrapheneNonEmptyQuery
):
    pass
