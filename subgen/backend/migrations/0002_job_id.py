# Generated by Django 3.2.7 on 2021-09-17 03:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='job',
            name='id',
            field=models.IntegerField(default=1, primary_key=True, serialize=False),
        ),
    ]