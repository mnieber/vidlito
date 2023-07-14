import graphene
from graphene_django.types import DjangoObjectType

from clips.models import Clip


class ClipT(DjangoObjectType):
    class Meta:
        model = Clip
        exclude = ["owner"]

    owner_username = graphene.String()
    tags = graphene.List(graphene.String)

    def resolve_owner_username(self, info):
        # If the clip has no source playlist then the owner has removed it
        # from all their playlists. In that case, we show the owner as
        # anonymous to all other users still using that clip.
        return self.owner.username if self.source_playlist else "anonymous"

    def resolve_tags(self, info):
        return [x for x in self.tags["tags"]]
