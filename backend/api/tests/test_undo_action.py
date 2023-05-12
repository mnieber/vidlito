import pytest

from actions.tests.random_data import create_random_action
from api.tests.graphqltestcase import GraphqlTestCase
from user_profiles.tests.random_data import create_random_user_profile

from .create_undo_action_mutation import create_undo_action_mutation


class TestUndoActionMutation(GraphqlTestCase):
    @pytest.fixture()
    def action(self, owner):
        return create_random_action(owner_id=owner.id)

    @pytest.mark.django_db()
    def test_undo_action__(
        self,
        action,
        client_query,
    ):
        query, operation_name, variables = create_undo_action_mutation(
            action_id=str(action.id),
            output_values=["success", "errors"],
        )
        response = client_query(
            query, operation_name=operation_name, variables=variables
        )
        data = response.json()["data"]

        # Check that the response is as expected
        assert data["undoAction"] == {"errors": {}, "success": True}
        assert False, "Moonleap Todo"
