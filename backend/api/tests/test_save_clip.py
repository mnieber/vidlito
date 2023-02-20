import pytest

from api.tests.graphqltestcase import GraphqlTestCase
from clips.models import Clip
from clips.tests.random_data import create_random_clip_form
from playlists.tests.random_data import create_random_playlist
from user_profiles.tests.random_data import create_random_user_profile

from .create_save_clip_mutation import create_save_clip_mutation


class TestSaveClipMutation(GraphqlTestCase):
    @pytest.fixture()
    def playlist(self, user_profile):
        return create_random_playlist(user_profile_id=user_profile.id)

    @pytest.mark.django_db()
    def test_save_clip__(
        self,
        playlist,
        client_query,
    ):
        query, operation_name, variables = create_save_clip_mutation(
            playlist_id=str(playlist.id),
            clip_form=create_random_clip_form(),
            output_values=["success", "errors"],
        )
        response = client_query(
            query, operation_name=operation_name, variables=variables
        )
        data = response.json()["data"]

        # Check that the response is as expected
        assert data["saveClip"] == {"errors": {}, "success": True}
        assert Clip.objects.filter(name=variables["clipForm"]["name"]).exists()
