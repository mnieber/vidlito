import graphene


class PlaylistSettingsFormT(graphene.InputObjectType):
    is_public = graphene.Boolean()
