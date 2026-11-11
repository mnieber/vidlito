from django.conf import settings
from django.contrib import admin
from django.urls import include, path
from graphene_django.views import GraphQLView

from vidlito_be.app.utils.serve_static import serve_static

urlpatterns = [
    path(r"admin/", admin.site.urls),
    # The session cookie authenticates the requests, so they must pass the CSRF check
    path(r"graphql/", GraphQLView.as_view(graphiql=True)),
    path(r"api/_allauth/", include("allauth.headless.urls")),
    path("martor/", include("martor.urls")),
] + ([] + serve_static(settings.STATIC_URL, document_root=settings.STATIC_ROOT))
