from rest_framework import viewsets
from .models import Task
from .serializers import TasksSerializer

class TasksViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TasksSerializer

