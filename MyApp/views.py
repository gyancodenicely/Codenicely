from django.shortcuts import render
from django.views.decorators.csrf import *
from .models import *


def index(request):
    return render(request,'login.html')

def registration(request):
    return render(request,'Registration.html')

@csrf_exempt
def loginUser(request):
    email = request.POST.get('email')
    password = request.POST.get('password')
    login = Registration.objects.filter(email=email,password=password)
    if login:
        return render(request,'dashboard.html')
    else:
        return render(request,'login.html')



@csrf_exempt
def register_data_store(request):
    if request.method == "POST":
        name = request.POST.get('name')
        email = request.POST.get('email')
        mobile = request.POST.get('mobile')
        gender = request.POST.get('gender')
        print(gender)
        password = request.POST.get('password')
        register = Registration(name=name,email=email,mobile=mobile,gender=gender,password=password)
        register.save()
        return render(request,'Registration.html',{'status':"Insert Successfully..!"})
    else:
        return render(request,'Registration.html',{'status':"Not Store Data In Database"})

