import graphene
from graphene_django.types import DjangoObjectType

from actions.models import Action


class ActionT(DjangoObjectType):
    class Meta:
        model = Action
        exclude = ["owner"]
