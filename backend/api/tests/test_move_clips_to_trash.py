import pytest

from api.tests.graphqltestcase import GraphqlTestCase
from clips.tests.random_data import create_random_clip
from playlists.tests.random_data import create_random_playlist
from user_profiles.tests.random_data import create_random_user_profile

from .create_move_clips_to_trash_mutation import create_move_clips_to_trash_mutation


class TestMoveClipsToTrashMutation(GraphqlTestCase):
    @pytest.fixture()
    def playlist(self, owner):
        return create_random_playlist(owner_id=owner.id)

    @pytest.fixture()
    def clips(self, owner):
        x1 = create_random_clip(owner_id=owner.id)
        x2 = create_random_clip(owner_id=owner.id)
        return [x1, x2]

    @pytest.mark.django_db()
    def test_move_clips_to_trash__(
        self,
        playlist,
        clips,
        client_query,
    ):
        clip_ids = [str(x.id) for x in clips]
        query, operation_name, variables = create_move_clips_to_trash_mutation(
            playlist_id=str(playlist.id),
            clip_ids=clip_ids,
            output_values=["success", "errors"],
        )
        response = client_query(
            query, operation_name=operation_name, variables=variables
        )
        data = response.json()["data"]

        # Check that the response is as expected
        assert data["moveClipsToTrash"] == {"errors": {}, "success": True}
        assert False, "Moonleap Todo"
