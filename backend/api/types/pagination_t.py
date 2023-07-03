import graphene


class PaginationT(graphene.ObjectType):
    nr_of_items = graphene.Int()
    page_size = graphene.Int()
    page = graphene.Int()
