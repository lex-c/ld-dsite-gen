# Generated by Django 3.1.4 on 2021-01-22 15:28

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0002_pic_temp_url'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='pic',
            name='temp_url',
        ),
    ]
