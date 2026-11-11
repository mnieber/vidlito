import graphene

from vidlito_be.api.query.getactions import create_pagination
from vidlito_be.api.types import *
from vidlito_be.api.types.searchresult_t import SearchResultT
from vidlito_be.search.utils.add_clip_search_results import add_clip_search_results
from vidlito_be.search.utils.add_playlist_search_results import add_playlist_search_results
from vidlito_be.search.utils.get_terms_and_tags import get_terms_and_tags


class SearchContentOutputs(graphene.ObjectType):
    search_results = graphene.List(SearchResultT)
    pagination = graphene.Field(PaginationT)


class SearchContent:
    search_content = graphene.Field(
        SearchContentOutputs,
        page=graphene.Int(required=True),
        page_size=graphene.Int(required=True),
        playlist_terms=graphene.String(),
        clip_terms=graphene.String(),
    )

    def resolve_search_content(
        self, info, page, page_size, playlist_terms=None, clip_terms=None
    ):
        search_results = []
        clip_query = get_terms_and_tags(clip_terms or "")
        playlist_query = get_terms_and_tags(playlist_terms or "")

        has_terms = playlist_query["terms"] or clip_query["terms"]

        add_playlist_search_results(info, search_results, playlist_query)
        add_clip_search_results(info, search_results, clip_query, has_terms)

        pagination = create_pagination(
            nr_of_items=len(search_results),
            page=page,
            page_size=page_size,
        )

        return SearchContentOutputs(
            search_results=search_results[pagination.start_idx : pagination.end_idx],
            pagination=pagination,
        )
