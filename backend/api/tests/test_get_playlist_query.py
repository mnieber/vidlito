import pytest

from api.tests.graphqltestcase import GraphqlTestCase
from playlists.tests.random_data import create_random_playlist

from .create_get_playlist_query import create_get_playlist_query


class TestGetPlaylistQuery(GraphqlTestCase):
    @pytest.fixture()
    def playlist(self, user_profile):
        return create_random_playlist(user_profile_id=user_profile.id)

    @pytest.mark.django_db()
    def test_get_playlist__(
        self,
        client_query,
        playlist,
    ):
        query, operation_name, variables = create_get_playlist_query(
            playlist_id=playlist_id, playlist_outputs=["id"]
        )
        response = client_query(
            query, operation_name=operation_name, variables=variables
        )

        # Check that the response is as expected
        data = response.json()["data"]
        assert data["playlist"] == {"id": playlist.id}
