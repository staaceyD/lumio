from django.urls import path, re_path

from .views import label, labels

urlpatterns = [
    path("", labels, name="labels"),
    path("<uuid:label_id>", label, name="label"),
]
