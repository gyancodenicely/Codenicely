# Generated by Django 2.1.1 on 2018-10-30 10:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('MyApp', '0004_auto_20181024_1205'),
    ]

    operations = [
        migrations.AddField(
            model_name='registration',
            name='otp',
            field=models.CharField(default='', max_length=7),
            preserve_default=False,
        ),
    ]
