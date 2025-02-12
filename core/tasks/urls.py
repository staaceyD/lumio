from django.urls import path, re_path

from .views import (
    tasks, task, delete_multiple_tasks
)

urlpatterns = [
    path("", tasks, name="tasks"),
    path("<uuid:task_id>", task, name="task"),
    re_path(r'^(?P<task_ids>([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12},?)+)$',delete_multiple_tasks, name='delete-multiple-tasks'),
]