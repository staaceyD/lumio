from django.urls import path

from .views import (
    tasks, task
)

urlpatterns = [
    path("", tasks, name="tasks"),
    path("<uuid:task_id>", task, name="task"),
]