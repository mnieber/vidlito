from graphene_django.types import DjangoObjectType

from vidlito_be.actions.models import Action


class ActionT(DjangoObjectType):
    class Meta:
        model = Action
        exclude = [
            "owner",
        ]
