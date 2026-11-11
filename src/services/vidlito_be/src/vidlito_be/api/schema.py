import graphene

from vidlito_be.api.mutation import Mutation
from vidlito_be.api.query import Query

schema = graphene.Schema(query=Query, mutation=Mutation)
