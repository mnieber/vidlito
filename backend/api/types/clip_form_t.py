import graphene


class ClipFormT(graphene.InputObjectType):
    description = graphene.String(required=False)
    name = graphene.String()
    slug = graphene.String(required=False)
    url = graphene.String(required=False)
    start_time_ms = graphene.Int(required=False)
    end_time_ms = graphene.Int(required=False)
    tags = graphene.List(graphene.String)
    id = graphene.UUID()
