# Generated by Django 3.2.7 on 2021-09-23 01:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0006_alter_job_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='job',
            name='name',
            field=models.CharField(default='a79a7826ef1742ee950e59899df60857', editable=False, max_length=32, primary_key=True, serialize=False),
        ),
    ]
