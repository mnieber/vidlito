import faker

from user_profiles.models import UserProfile

f = faker.Faker()


def create_random_user_profile():
    obj, created = UserProfile.objects.get_or_create(
        user_id=f.uuid4(),
        username=f.word(),
    )
    return obj
