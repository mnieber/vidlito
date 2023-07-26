import graphene
from graphene.types.generic import GenericScalar

from api.types import *
from api.types.searchresult_t import SearchResultT
from search.utils.add_clip_search_results import add_clip_search_results
from search.utils.add_playlist_search_results import add_playlist_search_results
from search.utils.get_terms_and_tags import get_terms_and_tags


class SearchContent(graphene.Mutation):
    success = graphene.Boolean()
    errors = GenericScalar()
    search_results = graphene.List(SearchResultT)
    pagination = graphene.Field(PaginationT)

    class Arguments:
        page = graphene.Int()
        page_size = graphene.Int()
        playlist_terms = graphene.String()
        clip_terms = graphene.String()

    def mutate(
        self,
        info,
        page,
        page_size,
        playlist_terms=None,
        clip_terms=None,
    ):
        search_results = []
        clip_query = get_terms_and_tags(clip_terms)
        playlist_query = get_terms_and_tags(playlist_terms)

        has_terms = playlist_query["terms"] or clip_query["terms"]

        add_playlist_search_results(info, search_results, playlist_query)
        add_clip_search_results(info, search_results, clip_query, has_terms)

        page_idx = page - 1
        start_idx = page_idx * page_size
        end_idx = start_idx + page_size
        page_results = search_results[start_idx:end_idx]

        return SearchContent(
            success=True,
            errors={},
            search_results=page_results,
            pagination=PaginationT(
                nr_of_items=len(search_results),
                page=page,
                page_size=page_size,
            ),
        )
