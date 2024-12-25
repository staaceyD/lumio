from rest_framework import viewsets
from .models import Tasks
from .serializers import TasksSerializer

class TasksViewSet(viewsets.ModelViewSet):
    queryset = Tasks.objects.all()
    serializer_class = TasksSerializer

