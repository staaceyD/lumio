from rest_framework import serializers
from .models import Task

class TasksSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'
    
class DeleteTasksSerializer(serializers.Serializer):
    ids = serializers.ListField(
        child=serializers.UUIDField(),
        allow_empty=False,
        help_text="List of IDs to delete"
    )