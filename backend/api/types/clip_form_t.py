import graphene


class ClipFormT(graphene.InputObjectType):
    description = graphene.String()
    name = graphene.String(required=True)
    slug = graphene.String()
    url = graphene.String()
    start_time_ms = graphene.Int()
    end_time_ms = graphene.Int()
    tags = graphene.List(graphene.String, required=True)
    id = graphene.UUID(required=True)
