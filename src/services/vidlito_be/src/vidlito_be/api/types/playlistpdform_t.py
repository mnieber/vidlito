import graphene


class PlaylistPdFormT(graphene.InputObjectType):
    description = graphene.String()
    id = graphene.UUID(required=True)
    tags = graphene.List(graphene.String, required=True)
