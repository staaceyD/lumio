from django.test import TestCase

# Create your tests here.

from django.urls import reverse
from rest_framework import status
import uuid

from .models import Task


class TaskRelatedViewTests(TestCase):
    def setUp(self):
        self.task = Task.objects.create(
            title="test title"
        )

    def test_list_tasks(self):
        url = reverse("tasks")
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Task.objects.count(), 1)
        self.assertEqual(str(self.task.id), response.json()[0]["id"])

    def test_create_task(self):
        url = reverse("tasks")
        data = {"title": "test"}

        response = self.client.post(url, data, format="json")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_invalid_create_post_without_body(self):
        url = reverse("tasks")
        response = self.client.post(url, format="json")

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    
    def test_get_task(self):
        url = reverse(f"task", args=[self.task.id])
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(str(self.task.id), response.json()["id"])

    def test_delete_task(self):
        url = reverse(f"task", args=[self.task.id])
        response = self.client.delete(url)

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Task.objects.count(), 0)

    def test_invalid_delete_task(self):
        invalid_id = uuid.uuid4()
        url = reverse(f"task", args=[invalid_id])
        response = self.client.delete(url)

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_update_task(self):
        url = reverse(f"task", args=[self.task.id])
        data = {"title": "updated title"}

        response = self.client.patch(url, data, content_type="application/json")
        print(response.json())
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Task.objects.get().title, "updated title")

    def test_invalid_update_task(self):
        invalid_id = uuid.uuid4()
        url = reverse(f"task", args=[invalid_id])
        data = {"title": "updated title"}

        response = self.client.patch(url, data, content_type="application/json")

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_update_invalid_task_field(self):
        url = reverse(f"task", args=[self.task.id])
        data = {"title": "test", "invalid_field": "invalid"}

        response = self.client.patch(url, data, content_type="application/json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)