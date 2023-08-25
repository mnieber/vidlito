import graphene


class PlaylistSettingsFormT(graphene.InputObjectType):
    is_public = graphene.Boolean(required=True)
    playlist_id = graphene.UUID(required=True)
