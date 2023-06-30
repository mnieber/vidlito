import graphene


class PaginationT(graphene.ObjectType):
    nr_of_pages = graphene.Int()
    page_size = graphene.Int()
    page = graphene.Int()
