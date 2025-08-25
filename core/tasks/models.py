import uuid

from django.contrib.auth.models import User
from django.db import models


class Label(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=50)
    color = models.CharField(max_length=7, blank=True, null=True)  # HEX code optional
    # TODO enable when auth added
    # models.ForeignKey(User, on_delete=models.CASCADE, related_name="label")

    # class Meta:
    #     unique_together = ("name", "user")  # Each user can have labels with unique names

    def __str__(self):
        return self.name


class Task(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=100)
    description = models.TextField(null=True, blank=True)
    note = models.TextField(null=True, blank=True)
    status = models.CharField(max_length=100, default="Not started")
    priority = models.CharField(max_length=100, null=True, blank=True)
    labels = models.ManyToManyField(Label, blank=True, related_name="task")
    # TODO enable when auth added
    # author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="task")
    due_date = models.DateField(null=True, blank=True)
    minutes_spent = models.IntegerField(null=True, blank=True)
    position = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        # # TODO enable when auth added
        # tasks = Task.objects.filter(author=User)
        tasks = Task.objects.all()

        # handle position auto increment
        if tasks.exists() and self._state.adding:
            last_task = tasks.latest("position")
            self.position = int(last_task.position) + 1
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title
