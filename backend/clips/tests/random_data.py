import faker
from api.types.clip_form_t import ClipFormT
from clips.models import Clip

f = faker.Faker()


def create_random_clip():
    obj, created = Clip.objects.get_or_create(
        description="# " + f.word(), name=f.word(), slug=f.word()
    )
    return obj


def create_random_clip_form():
    return ClipFormT(
        name="my clip",
    )
