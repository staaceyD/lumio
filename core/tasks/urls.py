from django.urls import path

from .views import (
    TasksViewSet,
)

urlpatterns = [
    path("", TasksViewSet.as_view({'get': 'list'}), name="tasks"),
]