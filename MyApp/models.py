from django.db import models

# Create your models here.
class Registration(models.Model):
    name = models.CharField(max_length=20)
    email = models.EmailField(max_length=20,primary_key=True)
    mobile = models.IntegerField()
    gender = models.CharField(max_length=6)
    password = models.CharField(max_length=20)
