from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

from .utils import create_default_labels, create_user_default_labels


@receiver(post_save, sender=User)
def create_default_labels_for_user(sender, instance, created, **kwargs):
    """
    Create default labels when a new user is created.
    Currently creates global labels since user-specific labels are not enabled.
    TODO: Update to create user-specific labels when auth is fully implemented.
    """
    if created:
        # For now, create global labels since user association is commented out
        # When auth is enabled, this should call create_user_default_labels(instance)
        labels = create_default_labels()
        print(f"Ensured default labels exist for new user: {instance.username}")
