import graphene


class PlaylistPDFormT(graphene.InputObjectType):
    id = graphene.UUID()
    description = graphene.String()
    tags = graphene.List(graphene.String, required=True)
