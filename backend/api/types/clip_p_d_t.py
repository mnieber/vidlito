from graphene_django.types import DjangoObjectType

from clips.models import ClipPD


class ClipPDT(DjangoObjectType):
    class Meta:
        model = ClipPD
