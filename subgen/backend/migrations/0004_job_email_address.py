# Generated by Django 3.2.7 on 2021-09-21 02:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0003_alter_job_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='job',
            name='email_address',
            field=models.EmailField(default='test@domain.com', max_length=254),
        ),
    ]
