# Generated by Django 5.2.1 on 2025-06-07 18:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('client_manager', '0007_alter_note_options_alter_transaction_options'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='client',
            name='status',
        ),
        migrations.DeleteModel(
            name='ClientStatus',
        ),
    ]
