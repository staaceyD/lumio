from rest_framework import viewsets
from .models import Task
from .serializers import TasksSerializer
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(["GET", "POST"])
def tasks(request):
    if request.method == "POST":
        # TODO enable when auth is added
        # request.data["author"] = request.user.pk
        serializer = TasksSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "GET":
        user = request.user
        # TODO enable when auth added
        # tasks = Task.objects.filter(author=user)
        tasks = Task.objects.all()
        serializer = TasksSerializer(tasks, many=True)
        return Response(serializer.data)

