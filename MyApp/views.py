from django.shortcuts import render
from django.views.decorators.csrf import *
from .models import *


def index(request):
    return render(request,'login.html')

def registration(request):
    reg = Registration.objects.all()

    return render(request,'Registration.html',{'reg':reg})

@csrf_exempt
def loginUser(request):
    mobile = request.POST.get('mobile')
    password = request.POST.get('password')
    login = Registration.objects.filter(mobile=mobile,password=password)
    if login:
        data = Registration.objects.filter(mobile=mobile).all()
        return render(request,'dashboard.html',{"data":data})
    else:
        return render(request,'login.html')



@csrf_exempt
def register_data_store(request):
    if request.method == "POST":
        name = request.POST.get('name')
        email = request.POST.get('email')
        mobile = request.POST.get('mobile')
        gender = request.POST.get('gender')
        password = request.POST.get('password')
        register = Registration(name=name,email=email,mobile=mobile,gender=gender,password=password)
        register.save()
        return render(request,'Registration.html',{'status':"Insert Successfully..!"})
    else:
        return render(request,'Registration.html',{'status':"Not Store Data In Database"})


@csrf_exempt
def profile_update(request):
    if request.method == "POST":
        name = request.POST.get('name')
        email = request.POST.get('email')
        mobile = request.POST.get('mobile')
        password = request.POST.get('password')
        Registration.objects.filter(mobile=mobile).update(name=name,email=email,password=password)
        return render(request,'dashboard.html',{'status':'Profile Update Successfully'})
    else:
        return render(request,'dashboard.html',context={'status':"Profile Not Update",'key':"error"})



def material(request):
    return render(request,'material.html')

