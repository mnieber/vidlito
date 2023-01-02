import pytest
from api.tests.graphqltestcase import GraphqlTestCase
from clips.tests.random_data import create_random_clip
from playlists.models import Playlist
from playlists.tests.random_data import create_random_playlist

from .create_save_clip_ordering_mutation import create_save_clip_ordering_mutation


class TestSaveClipOrderingMutation(GraphqlTestCase):
    @pytest.fixture()
    def playlist(self):
        return create_random_playlist()

    @pytest.fixture()
    def clips(self):
        x1 = create_random_clip()
        x2 = create_random_clip()
        return [x1, x2]

    @pytest.mark.django_db()
    def test_save_clip_ordering__(
        self,
        playlist,
        clips,
        client_query,
    ):
        clip_ids = [str(x.id) for x in clips]
        query, operation_name, variables = create_save_clip_ordering_mutation(
            playlist_id=str(playlist.id),
            clip_ids=clip_ids,
            output_values=["success", "errors"],
        )
        response = client_query(
            query, operation_name=operation_name, variables=variables
        )
        data = response.json()["data"]

        # Check that the response is as expected
        assert data["saveClipOrdering"] == {"errors": {}, "success": True}

        playlist = Playlist.objects.get(id=playlist.id)
        stored_ids = [str(x.id) for x in playlist.clip_set.all()]
        assert stored_ids == clip_ids
