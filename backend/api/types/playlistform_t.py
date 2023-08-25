import graphene


class PlaylistFormT(graphene.InputObjectType):
    description = graphene.String()
    id = graphene.UUID(required=True)
    is_public = graphene.Boolean(required=True)
    name = graphene.String(required=True)
    slug = graphene.String()
    tags = graphene.List(graphene.String, required=True)
