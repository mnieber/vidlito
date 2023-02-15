import faker

from actions.models import Action

f = faker.Faker()


def create_random_action():
    obj, created = Action.objects.get_or_create(
        type=f.word(),
        data={},
    )
    return obj
