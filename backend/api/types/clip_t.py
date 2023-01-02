from clips.models import Clip
from graphene_django.types import DjangoObjectType


class ClipT(DjangoObjectType):
    class Meta:
        model = Clip
