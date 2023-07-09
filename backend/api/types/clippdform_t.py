import graphene


class ClipPDFormT(graphene.InputObjectType):
    id = graphene.UUID()
    description = graphene.String()
    tags = graphene.List(graphene.String, required=True)
