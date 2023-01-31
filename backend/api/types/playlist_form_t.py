import graphene


class PlaylistFormT(graphene.InputObjectType):
    description = graphene.String(required=False)
    name = graphene.String()
    slug = graphene.String(required=False)
    id = graphene.ID()
    owner_id = graphene.ID()
