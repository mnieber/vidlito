import graphene


class PaginationT(graphene.ObjectType):
    nr_of_items = graphene.Int()
    page = graphene.Int()
    page_size = graphene.Int()
    start_idx = graphene.Int()
    end_idx = graphene.Int()
