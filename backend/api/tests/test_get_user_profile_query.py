import pytest

from api.tests.graphqltestcase import GraphqlTestCase
from user_profiles.tests.random_data import create_random_user_profile

from .create_get_user_profile_query import create_get_user_profile_query


class TestGetUserProfileQuery(GraphqlTestCase):
    @pytest.fixture()
    def user_profile(self):
        return create_random_user_profile()

    @pytest.mark.django_db()
    def test_get_user_profile__(
        self,
        client_query,
        user_profile,
    ):
        query, operation_name, variables = create_get_user_profile_query(
            user_profile_outputs=["id"]
        )
        response = client_query(
            query, operation_name=operation_name, variables=variables
        )

        # Check that the response is as expected
        data = response.json()["data"]
        assert False, "Moonleap Todo"

        assert data["userProfile"] == {"id": user_profile.id}
