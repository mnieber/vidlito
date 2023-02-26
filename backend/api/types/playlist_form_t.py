import graphene


class PlaylistFormT(graphene.InputObjectType):
    description = graphene.String()
    name = graphene.String(required=True)
    slug = graphene.String()
    tags = graphene.List(graphene.String, required=True)
    id = graphene.UUID(required=True)
    owner_id = graphene.UUID(required=True)
