from django.db import models
from PIL import Image

# Create your models here.
class Registration(models.Model):

    name = models.CharField(max_length=20)
    email = models.EmailField(max_length=25)
    mobile = models.CharField(max_length=10)
    gender = models.CharField(max_length=7)
    password = models.CharField(max_length=20)


#create Student Record
class StudentData(models.Model):
    student_img = models.ImageField(upload_to='photo/', null=True, verbose_name="")
    roll_no = models.CharField(max_length=5)
    name = models.CharField(max_length=30)
    email = models.EmailField(max_length=25)
    mobile = models.CharField(max_length=10)
    password = models.CharField(max_length=20)
    gender = models.CharField(max_length=7)
    dob = models.DateField()
    address = models.CharField(max_length=100)


#create marks table

class Marks(models.Model):
    student = models.OneToOneField(StudentData,primary_key=True,on_delete=models.CASCADE)
    roll_no = models.CharField(max_length=7)
    math = models.CharField(max_length=3)
    science = models.CharField(max_length=3)
    socal = models.CharField(max_length=3)
    english = models.CharField(max_length=3)
    hindi = models.CharField(max_length=3)
    sanskrit = models.CharField(max_length=3)
    obtain = models.DecimalField(max_digits=6,decimal_places=2)
    percentage = models.DecimalField(max_digits=6,decimal_places=2)
    result = models.CharField(max_length=5)

#image upload

class Image(models.Model):
    mobile = models.CharField(max_length=10)
    image = models.ImageField(upload_to='photo/',null=True,verbose_name="")




