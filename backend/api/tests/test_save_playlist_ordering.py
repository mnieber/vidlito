import pytest

from api.tests.graphqltestcase import GraphqlTestCase
from playlists.tests.random_data import create_random_playlist
from user_profiles.tests.random_data import create_random_user_profile

from .create_save_playlist_ordering_mutation import (
    create_save_playlist_ordering_mutation,
)


class TestSavePlaylistOrderingMutation(GraphqlTestCase):
    @pytest.fixture()
    def playlists(self, owner):
        x1 = create_random_playlist(owner_id=owner.id)
        x2 = create_random_playlist(owner_id=owner.id)
        return [x1, x2]

    @pytest.mark.django_db()
    def test_save_playlist_ordering__(
        self,
        playlists,
        client_query,
    ):
        playlist_ids = [str(x.id) for x in playlists]
        query, operation_name, variables = create_save_playlist_ordering_mutation(
            playlist_ids=playlist_ids,
            output_values=["success", "errors"],
        )
        response = client_query(
            query, operation_name=operation_name, variables=variables
        )
        data = response.json()["data"]

        # Check that the response is as expected
        assert data["savePlaylistOrdering"] == {"errors": {}, "success": True}
        assert False, "Moonleap Todo"
