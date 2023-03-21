import pytest

from api.tests.graphqltestcase import GraphqlTestCase
from playlists.tests.random_data import create_random_playlist
from user_profiles.tests.random_data import create_random_user_profile

from .create_undo_action_mutation import create_undo_action_mutation


class TestUndoActionMutation(GraphqlTestCase):
    @pytest.fixture()
    def playlist(self, owner):
        return create_random_playlist(owner_id=owner.id)

    @pytest.mark.django_db()
    def test_undo_action__(
        self,
        playlist,
        client_query,
    ):
        query, operation_name, variables = create_undo_action_mutation(
            playlist_id=str(playlist.id),
            output_values=["success", "errors"],
        )
        response = client_query(
            query, operation_name=operation_name, variables=variables
        )
        data = response.json()["data"]

        # Check that the response is as expected
        assert data["undoAction"] == {"errors": {}, "success": True}
        assert False, "Moonleap Todo"
