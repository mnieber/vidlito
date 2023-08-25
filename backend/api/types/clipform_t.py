import graphene


class ClipFormT(graphene.InputObjectType):
    description = graphene.String()
    end_time_ms = graphene.Int()
    id = graphene.UUID(required=True)
    name = graphene.String(required=True)
    slug = graphene.String()
    start_time_ms = graphene.Int()
    tags = graphene.List(graphene.String, required=True)
    url = graphene.String()
