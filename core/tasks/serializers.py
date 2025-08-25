from rest_framework import serializers

from .models import Label, Task


class LabelsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Label
        fields = "__all__"


class TasksSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", read_only=True)
    modified_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", read_only=True)

    class Meta:
        model = Task
        fields = "__all__"


class DeleteTasksSerializer(serializers.Serializer):
    ids = serializers.ListField(
        child=serializers.UUIDField(),
        allow_empty=False,
        help_text="List of IDs to delete",
    )
