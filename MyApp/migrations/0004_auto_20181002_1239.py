# Generated by Django 2.1.1 on 2018-10-02 12:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('MyApp', '0003_auto_20181001_1249'),
    ]

    operations = [
        migrations.AlterField(
            model_name='registration',
            name='email',
            field=models.EmailField(max_length=20),
        ),
        migrations.AlterField(
            model_name='registration',
            name='mobile',
            field=models.IntegerField(primary_key=True, serialize=False),
        ),
    ]
