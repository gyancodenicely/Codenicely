from django.db import models

# Create your models here.
class Registration(models.Model):
    name = models.CharField(max_length=20)
    email = models.EmailField(max_length=20)
    mobile = models.IntegerField(primary_key=True)
    gender = models.CharField(max_length=6)
    password = models.CharField(max_length=20)



class StudentData(models.Model):
    sid = models.IntegerField(default=5,primary_key=True)
    name = models.CharField(max_length=20)
    email = models.EmailField()
    mobile = models.IntegerField()
    password = models.CharField(max_length=20)
    gender = models.CharField(max_length=10)
    dob = models.DateField()
    address = models.CharField(max_length=100)


