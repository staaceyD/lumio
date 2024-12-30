from django.test import TestCase

# Create your tests here.

from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .models import Task


class TaskRelatedViewTests(TestCase):
    def setUp(self):
        self.task = Task.objects.create(
            title="test title"
        )

    def test_get_tasks(self):
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