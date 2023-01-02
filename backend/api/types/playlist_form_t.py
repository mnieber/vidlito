import graphene


class PlaylistFormT(graphene.InputObjectType):
    description = graphene.String(required=False)
    name = graphene.String()
    slug = graphene.String(required=False)
    id = graphene.ID(required=False)
    sort_pos = graphene.Int(required=False)
