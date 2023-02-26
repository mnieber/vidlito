import faker

from api.types.clip_form_t import ClipFormT
from clips.models import Clip

f = faker.Faker()


def create_random_clip(
    owner_id,
):
    obj, created = Clip.objects.get_or_create(
        name=f.word(),
        tags=[f.word(), f.word()],
        owner_id=owner_id,
    )
    return obj


def create_random_clip_form():
    return ClipFormT(
        name=f.word(),
        tags=[f.word(), f.word()],
        owner_id=f.uuid4(),
    )
