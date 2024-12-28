from django.db import models
import uuid
from django.contrib.auth.models import User

class Task(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=100)
    description = models.TextField(null=True, blank=True)
    note = models.TextField(null=True, blank=True)
    status = models.CharField(max_length=100, default="Not started")
    priority = models.CharField(max_length=100, null=True, blank=True)
    label = models.CharField(max_length=100, null=True, blank=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="task")
    due_date = models.DateTimeField(null=True, blank=True)
    minutes_spent = models.IntegerField(null=True, blank=True) 
    position = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        tasks = Task.objects.filter(author=User)

        if tasks.exists() and self._state.adding:
            last_task = tasks.latest('position')
            self.position = int(last_task.position) + 1
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title
