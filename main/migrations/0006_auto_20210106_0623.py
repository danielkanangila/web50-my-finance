# Generated by Django 3.1.2 on 2021-01-06 06:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0005_auto_20210106_0622'),
    ]

    operations = [
        migrations.AlterField(
            model_name='transaction',
            name='currency',
            field=models.CharField(default='USD', max_length=3),
        ),
    ]
