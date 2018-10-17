from django.db import models

# Create your models here.
class Registration(models.Model):

    name = models.CharField(max_length=20)
    email = models.EmailField()
    mobile = models.CharField(max_length=10)
    gender = models.CharField(max_length=6)
    password = models.CharField(max_length=20)


#create Student Record
class StudentData(models.Model):

    roll_no = models.CharField(max_length=5)
    name = models.CharField(max_length=20)
    email = models.EmailField()
    mobile = models.CharField(max_length=10)
    password = models.CharField(max_length=20)
    gender = models.CharField(max_length=10)
    dob = models.DateField()
    address = models.CharField(max_length=100)


#create marks table




