import graphene


class ClipPdFormT(graphene.InputObjectType):
    description = graphene.String()
    id = graphene.UUID(required=True)
    tags = graphene.List(graphene.String, required=True)
