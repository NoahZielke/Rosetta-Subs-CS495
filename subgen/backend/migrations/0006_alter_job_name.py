# Generated by Django 3.2.7 on 2021-09-21 17:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0005_auto_20210921_1709'),
    ]

    operations = [
        migrations.AlterField(
            model_name='job',
            name='name',
            field=models.CharField(default='9d31e2506f7940e7988671776298920c', editable=False, max_length=32, primary_key=True, serialize=False),
        ),
    ]