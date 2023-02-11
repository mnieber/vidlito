import pytest

from api.tests.graphqltestcase import GraphqlTestCase
from playlists.models import Playlist
from playlists.tests.random_data import create_random_playlist_form

from .create_save_playlist_mutation import create_save_playlist_mutation


class TestSavePlaylistMutation(GraphqlTestCase):
    @pytest.mark.django_db()
    def test_save_playlist__(
        self,
        client_query,
    ):
        query, operation_name, variables = create_save_playlist_mutation(
            playlist_form=create_random_playlist_form(),
            output_values=["success", "errors"],
        )
        response = client_query(
            query, operation_name=operation_name, variables=variables
        )
        data = response.json()["data"]

        # Check that the response is as expected
        assert data["savePlaylist"] == {"errors": {}, "success": True}
        assert Playlist.objects.filter(name=variables["playlistForm"]["name"]).exists()
