from .models import Task
from drf_spectacular.utils import extend_schema, extend_schema_view
from .serializers import TasksSerializer
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404, get_list_or_404

@extend_schema_view(
    get=extend_schema(
        description="Returns a list of Task model instances.", responses=TasksSerializer
    ),
    post=extend_schema(
        description="Creates a new post by authenticated user",
        request=TasksSerializer,
        responses=TasksSerializer,
    ),
)
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

    if request.method == "GET":
        # TODO enable when auth added
        # user = request.user
        # tasks = Task.objects.filter(author=user)
        tasks = Task.objects.all()
        serializer = TasksSerializer(tasks, many=True)
        return Response(serializer.data)

@extend_schema_view(
    delete=extend_schema(
        description="Deletes multiple Task model instances.",
        responses=TasksSerializer,
    ),
)
@api_view(["DELETE"])
def delete_multiple_tasks(request, task_ids):
    ids = task_ids.split(',')
    tasks = get_list_or_404(Task, id__in=ids)
    deleted_count, _ = Task.objects.filter(id__in=ids).delete()

    return Response(
        {"message": f"{deleted_count} tasks deleted successfully"},
        status=status.HTTP_204_NO_CONTENT,
    )

@extend_schema_view(
    get=extend_schema(
        description="Returns a single Task model instance.", responses=TasksSerializer
    ),
    patch=extend_schema(
        description="Updates a single Task model instance.",
        request=TasksSerializer,
        responses=TasksSerializer,
    ),
    delete=extend_schema(
        description="Deletes a single Task model instance.",
        responses=TasksSerializer,
    ),
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