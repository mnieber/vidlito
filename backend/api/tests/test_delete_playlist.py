import pytest
from api.tests.graphqltestcase import GraphqlTestCase
from playlists.models import Playlist
from playlists.tests.random_data import create_random_playlist

from .create_delete_playlist_mutation import create_delete_playlist_mutation


class TestDeletePlaylistMutation(GraphqlTestCase):
    @pytest.fixture()
    def playlist(self):
        return create_random_playlist()

    @pytest.mark.django_db()
    def test_delete_playlist__(
        self,
        playlist,
        client_query,
    ):
        assert Playlist.objects.filter(id=playlist.id).exists()
        query, operation_name, variables = create_delete_playlist_mutation(
            playlist_id=str(playlist.id),
            output_values=["success", "errors"],
        )
        response = client_query(
            query, operation_name=operation_name, variables=variables
        )
        data = response.json()["data"]

        # Check that the response is as expected
        assert data["deletePlaylist"] == {"errors": {}, "success": True}
        assert not Playlist.objects.filter(id=playlist.id).exists()
