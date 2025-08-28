from django.contrib.auth.models import User
from django.core.management.base import BaseCommand
from tasks.utils import (
    create_user_default_labels,
    ensure_default_labels_exist,
    get_default_label_names,
)

from tasks.utils import create_default_labels  # isort:skip


class Command(BaseCommand):
    help = "Create default labels for all users or a specific user"

    def add_arguments(self, parser):
        parser.add_argument(
            "--user_id",
            type=int,
            help="Create default labels for a specific user ID",
        )
        parser.add_argument(
            "--all-users",
            action="store_true",
            help="Create default labels for all users",
        )
        parser.add_argument(
            "--ensure",
            action="store_true",
            help="Ensure default labels exist without creating duplicates",
        )

    def handle(self, *args, **options):
        if options["ensure"]:
            missing_count = ensure_default_labels_exist()
            if missing_count > 0:
                self.stdout.write(
                    self.style.SUCCESS(
                        f"Created {missing_count} missing default labels"
                    )
                )
            else:
                self.stdout.write(
                    self.style.SUCCESS("All default labels already exist")
                )
            return

        if options["user_id"]:
            try:
                user = User.objects.get(id=options["user_id"])
                labels = create_user_default_labels(user)
                self.stdout.write(
                    self.style.SUCCESS(
                        f"Successfully created/ensured default labels for user: {user.username}"
                    )
                )
                for label in labels:
                    self.stdout.write(f"  Label: {label.name} ({label.color})")
            except User.DoesNotExist:
                self.stdout.write(
                    self.style.ERROR(
                        f'User with ID {options["user_id"]} does not exist'
                    )
                )
        elif options["all_users"]:
            users = User.objects.all()
            for user in users:
                labels = create_user_default_labels(user)
                self.stdout.write(f"Processed user: {user.username}")
            self.stdout.write(
                self.style.SUCCESS(
                    f"Successfully processed default labels for {users.count()} users"
                )
            )
        else:
            # Create global default labels (when auth is not enabled)
            labels = create_default_labels()
            self.stdout.write(
                self.style.SUCCESS("Successfully created global default labels")
            )
            for label in labels:
                self.stdout.write(f"  Label: {label.name} ({label.color})")

        # Show summary
        default_names = get_default_label_names()
        self.stdout.write(
            self.style.SUCCESS(f'Default labels configured: {", ".join(default_names)}')
        )
