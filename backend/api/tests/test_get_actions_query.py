import pytest

from actions.tests.random_data import create_random_action
from api.tests.graphqltestcase import GraphqlTestCase

from .create_get_actions_query import create_get_actions_query


class TestGetActionsQuery(GraphqlTestCase):
    @pytest.fixture()
    def actions(self, user_profile):
        x1 = create_random_action(user_profile_id=user_profile.id)
        x2 = create_random_action(user_profile_id=user_profile.id)
        return [x1, x2]

    @pytest.mark.django_db()
    def test_get_actions__(
        self,
        client_query,
        action_set,
    ):
        query, operation_name, variables = create_get_actions_query(
            playlist_slug=playlist_slug, action_set_outputs=["id"]
        )
        response = client_query(
            query, operation_name=operation_name, variables=variables
        )

        # Check that the response is as expected
        data = response.json()["data"]
        assert False, "Moonleap Todo"

        assert len(data["actionSet"])
