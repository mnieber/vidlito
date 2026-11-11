from django.db import migrations


def verify_existing_email_addresses(apps, schema_editor):
    """The users of django-rtk activated their account by email, so their email
    address is verified. Allauth requires a verified EmailAddress to sign in."""
    User = apps.get_model("users", "User")
    EmailAddress = apps.get_model("account", "EmailAddress")

    for user in User.objects.filter(is_active=True):
        if not EmailAddress.objects.filter(user=user).exists():
            EmailAddress.objects.create(
                user=user, email=user.email, primary=True, verified=True
            )


class Migration(migrations.Migration):
    dependencies = [
        ("users", "0001_initial"),
        ("account", "0009_emailaddress_unique_primary_email"),
    ]

    operations = [
        migrations.RunPython(verify_existing_email_addresses, migrations.RunPython.noop),
    ]
