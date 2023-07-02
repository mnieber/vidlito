import graphene


class SearchResultT(graphene.ObjectType):
    id = graphene.String()
    playlist_slug = graphene.String()
    clip_slug = graphene.String()
    nr_of_clips = graphene.Int()
    owner_username = graphene.String()
