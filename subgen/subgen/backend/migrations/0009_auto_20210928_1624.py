# Generated by Django 3.2.7 on 2021-09-28 16:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0008_auto_20210928_1548'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='job',
            name='name',
        ),
        migrations.AddField(
            model_name='job',
            name='id',
            field=models.BigAutoField(auto_created=True, default=124234, primary_key=True, serialize=False, verbose_name='ID'),
            preserve_default=False,
        ),
    ]
