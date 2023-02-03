import pytest

from api.tests.graphqltestcase import GraphqlTestCase
from clips.models import Clip
from clips.tests.random_data import create_random_clip

from .create_delete_clips_mutation import create_delete_clips_mutation


class TestDeleteClipsMutation(GraphqlTestCase):
    @pytest.fixture()
    def clips(self):
        x1 = create_random_clip()
        x2 = create_random_clip()
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
