from graphene_django.types import DjangoObjectType

from clips.models import Clip


class ClipT(DjangoObjectType):
    class Meta:
        model = Clip
