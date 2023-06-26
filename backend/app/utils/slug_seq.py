import re

from django.db import transaction
from django.db.models import F

from app.models import SlugSequence


def get_next_slug_seq(slug_id):
    with transaction.atomic():
        slug_sequence, created = SlugSequence.objects.select_for_update().get_or_create(
            id=slug_id, defaults={"sequence": 1}
        )
        if not created:
            slug_sequence.sequence = F("sequence") + 1
            slug_sequence.save()
            slug_sequence.refresh_from_db()
        return slug_sequence.sequence


def get_slug_postfix(slug):
    match = re.search(r"-\d*$", slug)
    return match.group(0) if match else ""


def update_slug(slug, slug_type):
    slug_postfix = get_slug_postfix(slug)
    slug_prefix = slug[: -len(slug_postfix)]
    slug_id = slug_type + "/" + slug_prefix
    slug_seq = get_next_slug_seq(slug_id)
    return slug_prefix + "-" + ("" if slug_seq == 1 else str(slug_seq))
