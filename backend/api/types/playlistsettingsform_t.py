import graphene


class PlaylistSettingsFormT(graphene.InputObjectType):
    playlist_id = graphene.UUID()
    is_public = graphene.Boolean()
