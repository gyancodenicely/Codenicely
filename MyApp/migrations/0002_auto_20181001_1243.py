# Generated by Django 2.1.1 on 2018-10-01 12:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('MyApp', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='registration',
            name='mobile',
            field=models.IntegerField(),
        ),
    ]
