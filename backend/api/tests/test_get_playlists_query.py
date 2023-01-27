import pytest

from api.tests.graphqltestcase import GraphqlTestCase
from playlists.tests.random_data import create_random_playlist

from .create_get_playlists_query import create_get_playlists_query


class TestGetPlaylistsQuery(GraphqlTestCase):
    @pytest.fixture()
    def playlists(self, user_profile):
        x1 = create_random_playlist(user_profile_id=user_profile.id)
        x2 = create_random_playlist(user_profile_id=user_profile.id)
        return [x1, x2]

    @pytest.mark.django_db()
    def test_get_playlists__(
        self,
        client_query,
        playlists,
    ):
        query, operation_name, variables = create_get_playlists_query(
            playlists_outputs=["id", "clipSet { id }"]
        )
        response = client_query(
            query, operation_name=operation_name, variables=variables
        )

        # Check that the response is as expected
        data = response.json()["data"]["getPlaylists"]
        assert len(data["playlists"])
