from .models import Task
from .serializers import TasksSerializer, DeleteTasksSerializer
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

@api_view(["GET", "POST", "DELETE"])
def tasks(request):
    if request.method == "POST":
        # TODO enable when auth is added
        # request.data["author"] = request.user.pk
        serializer = TasksSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == "GET":
        # TODO enable when auth added
        # user = request.user
        # tasks = Task.objects.filter(author=user)
        tasks = Task.objects.all()
        serializer = TasksSerializer(tasks, many=True)
        return Response(serializer.data)

    if request.method == "DELETE":
        serializer = DeleteTasksSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        ids = serializer.validated_data['ids']
        deleted_count, _ = Task.objects.filter(id__in=ids).delete()

        return Response(
            {"message": f"{deleted_count} items deleted successfully."},
            status=status.HTTP_200_OK
        )


    
@api_view(["GET", "PATCH", "DELETE"])
def task(request, task_id):
    task = get_object_or_404(Task, id=task_id)

    if request.method == "GET":
        serializer = TasksSerializer(task)
        return Response(serializer.data)
    if request.method == "DELETE":
        task.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    if request.method == "PATCH":
        serializer = TasksSerializer(task, data=request.data, partial=True)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)