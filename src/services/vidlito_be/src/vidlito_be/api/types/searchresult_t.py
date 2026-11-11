import graphene


class SearchResultT(graphene.ObjectType):
    clip_name = graphene.String()
    clip_slug = graphene.String()
    id = graphene.UUID()
    nr_of_clips = graphene.Int()
    owner_username = graphene.String()
    playlist_name = graphene.String()
    playlist_slug = graphene.String()
