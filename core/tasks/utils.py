from .models import Label

DEFAULT_LABELS = [
    {"name": "Personal", "color": "#6366F1"},
    {"name": "Work", "color": "#EF4444"},
    {"name": "Shopping", "color": "#10B981"},
    {"name": "Others", "color": "#F59E0B"},
]


def create_default_labels():
    """
    Create default labels if they don't exist.
    Returns a list of created or existing labels.
    """
    created_labels = []

    for label_data in DEFAULT_LABELS:
        label, created = Label.objects.get_or_create(
            name=label_data["name"],
            defaults={
                "color": label_data["color"],
            },
        )
        created_labels.append(label)

    return created_labels


def create_user_default_labels(user):
    """
    Create default labels for a specific user.
    This function is ready for when user authentication is fully implemented.

    Args:
        user: Django User instance

    Returns:
        List of created or existing labels for the user
    """
    created_labels = []

    for label_data in DEFAULT_LABELS:
        label, created = Label.objects.get_or_create(
            name=label_data["name"],
            # user=user,  # TODO: Enable when auth is added
            defaults={
                "color": label_data["color"],
            },
        )
        created_labels.append(label)

    return created_labels


def get_default_label_names():
    """
    Get the names of all default labels.
    Useful for identifying which labels are defaults vs user-created.
    """
    return [label["name"] for label in DEFAULT_LABELS]


def ensure_default_labels_exist():
    """
    Ensure that all default labels exist in the database.
    This is a safe operation that won't create duplicates.
    """
    missing_labels = []

    for label_data in DEFAULT_LABELS:
        if not Label.objects.filter(name=label_data["name"]).exists():
            missing_labels.append(label_data)

    if missing_labels:
        for label_data in missing_labels:
            Label.objects.create(name=label_data["name"], color=label_data["color"])

    return len(missing_labels)
