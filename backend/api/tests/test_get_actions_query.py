import pytest

from actions.tests.random_data import create_random_action
from api.tests.graphqltestcase import GraphqlTestCase

from .create_get_actions_query import create_get_actions_query


class TestGetActionsQuery(GraphqlTestCase):
    @pytest.fixture()
    def actions(self, owner):
        x1 = create_random_action(owner_id=owner.id)
        x2 = create_random_action(owner_id=owner.id)
        return [x1, x2]

    @pytest.mark.django_db()
    def test_get_actions__(
        self,
        client_query,
        action_set,
    ):
        query, operation_name, variables = create_get_actions_query(
            playlist_id=playlist_id, action_set_outputs=["id"]
        )
        response = client_query(
            query, operation_name=operation_name, variables=variables
        )

        # Check that the response is as expected
        data = response.json()["data"]
        assert False, "Moonleap Todo"

        assert len(data["actionSet"])
