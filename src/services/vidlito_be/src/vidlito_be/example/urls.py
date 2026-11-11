# example/urls.py
from django.urls import path

from vidlito_be.example.views import index


urlpatterns = [
    path('', index),
]