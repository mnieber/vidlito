import graphene
from django.db.models import Q
from graphene_django.types import DjangoObjectType

from api.types.clip_t import ClipT  # noqa: F401
from playlists.models import Playlist
from user_profiles.models import UserProfile


class PlaylistT(DjangoObjectType):
    class Meta:
        model = Playlist
        exclude = [
            "entry_set",
            "owner",
            "sort_pos",
        ]

    clip_set = graphene.List(ClipT)
    owner_username = graphene.String()
    tags = graphene.List(graphene.String)

    def resolve_clip_set(self, info):
        return [
            x.clip
            for x in self.entry_set.filter(
                Q(clip__nr_of_public_playlists__gt=0)
                | Q(clip__owner_id=UserProfile.get_id(info))
            ).select_related("clip")
        ]

    def resolve_owner_username(self, info):
        return self.owner.username

    def resolve_tags(self, info):
        return [x for x in self.tags["tags"]]
