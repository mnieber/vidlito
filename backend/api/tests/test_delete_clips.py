import pytest

from api.tests.graphqltestcase import GraphqlTestCase
from clips.models import Clip
from clips.tests.random_data import create_random_clip
from user_profiles.tests.random_data import create_random_user_profile

from .create_delete_clips_mutation import create_delete_clips_mutation


class TestDeleteClipsMutation(GraphqlTestCase):
    @pytest.fixture()
    def owner(self):
        return create_random_user_profile()

    @pytest.fixture()
    def clips(self, owner):
        x1 = create_random_clip(owner_id=owner.id)
        x2 = create_random_clip(owner_id=owner.id)
        return [x1, x2]

    @pytest.mark.django_db()
    def test_delete_clips__(
        self,
        clips,
        client_query,
    ):
        clip_ids = [str(x.id) for x in clips]
        query, operation_name, variables = create_delete_clips_mutation(
            clip_ids=clip_ids,
            output_values=["success", "errors"],
        )
        response = client_query(
            query, operation_name=operation_name, variables=variables
        )
        data = response.json()["data"]

        # Check that the response is as expected
        assert data["deleteClips"] == {"errors": {}, "success": True}
        assert not Clip.objects.filter(id__in=clip_ids).exists()
