import faker

from actions.models import Action

f = faker.Faker()


def create_random_action(
    owner_id,
):
    obj, created = Action.objects.get_or_create(
        type=f.word(),
        data={},
        owner_id=owner_id,
    )
    return obj
