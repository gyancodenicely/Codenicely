from django.http import HttpResponseRedirect, HttpResponse, JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import *
from .models import *
from django.contrib.auth.decorators import login_required


def login(request):
    # if request.method == 'GET':
    return render(request,'login.html')


def registration(request):
    reg = Registration.objects.all()
    return render(request,'Registration.html',{'reg':reg})
#@login_required(login_url='/login/')
def dashboard(request):
    mobile = request.session['mobile']
    try:
        if mobile:
            student = StudentData.objects.all()
            data = Registration.objects.filter(mobile=mobile).all()
            return render(request, 'dashboard.html', {"data": data,'student': student})
        else:
            return HttpResponseRedirect('/login/')
    except Exception:
        raise render(request,'login.html')




#@login_required(login_url='/login/')
@csrf_exempt
def loginUser(request):
    response = {}

    if request.method == "POST":
        mobile = request.POST['mobile']
        password = request.POST['password']
        try:
            login = Registration.objects.get(mobile=mobile, password=password)
            if login :
                request.session['mobile'] = mobile
                response['success']=True
                return JsonResponse(response)
                #return HttpResponseRedirect('/dashboard/')
            else:
                response['success']=False
                return JsonResponse(response)
        except Exception as e:
            print("Login Error")


        return JsonResponse(response)





@csrf_exempt
def register_data_store(request):
    response={}
    if request.method == "POST":
        name = request.POST.get('name')
        email = request.POST.get('email')
        mobile = request.POST.get('mobile')
        gender = request.POST.get('gender')
        password = request.POST.get('password')
        # print(name)
        # print(email)
        # print(mobile)
        # print(gender)
        # print(password)
        # return JsonResponse(response)

        reg = Registration.objects.create(name=name,email=email,mobile=mobile,gender=gender,password=password)
        if reg:
            reg.save()
            response['success']=True
            return JsonResponse(response)
        else:
            response['success']=False
            return JsonResponse(response)


    else:
        return render(request,'Registration.html',{'status':"Not Store Data In Database"})


@csrf_exempt
def profile_update(request):
    student = StudentData.objects.all()
    if request.method == "POST":
        name = request.POST.get('name')
        email = request.POST.get('email')
        mobile = request.POST.get('mobile')
        password = request.POST.get('password')
        Registration.objects.filter(mobile=mobile).update(name=name,email=email,password=password)
        data = Registration.objects.filter(mobile=mobile)
        return render(request,'dashboard.html',{"data": data,'student':student})
    else:
        return render(request, 'dashboard.html', {'student': student})



def material(request):
    return render(request,'material.html')



def studentpage(request):
    sid = request.GET.get('sid')
    #print(sid)
    student = StudentData.objects.filter(sid=sid)


    return render(request, 'studentpage.html',{'student':student})

@csrf_exempt
def student_data_store(request):
    if request.method == "POST":
        sid = request.POST.get('sid')
        name = request.POST.get('name')
        email = request.POST.get('email')
        mobile = request.POST.get('mobile')
        password = request.POST.get('password')
        gender = request.POST.get('gender')
        dob = request.POST.get('dob')
        address = request.POST.get('address')
        # print(sid)
        # print(name)
        # print(email)
        # print(mobile)
        # print(gender)
        # print(dob)
        # print(address)
        try:
            StudentData.objects.create(sid=sid,name=name,email=email,mobile=mobile,password=password,gender=gender,dob=dob,address=address)
            #print(std)
        except Exception as ex:
            print(ex)
            return render(request,'studentpage.html',{'msg':"This ID Already Exist"})



        return render(request,'studentpage.html',{'status':"Student Record insert Successfully...!"})
    else:
        return render(request,'studentpage.html',{'status1':"Record Not Store"})



@csrf_exempt
def student_data_update(request):
    sid = request.POST.get('sid')
    name = request.POST.get('name')
    email=request.POST.get('email')
    mobile = request.POST.get('mobile')
    password = request.POST.get('password')
    dob = request.POST.get('dob')
    #gender = request.POST.get('gender')
    address = request.POST.get('address')
    # print(sid)
    # print(name)
    # print(email)
    # print(mobile)
    # print(gender)
    # print(address)
    StudentData.objects.filter(sid=sid).update(name=name,email=email,dob= dob,mobile=mobile,password=password,address=address)
    student = StudentData.objects.all()
    mobile1 = request.session['mobile']
    data = Registration.objects.filter(mobile=mobile1)
    return render(request, 'dashboard.html', {'data':data,'student': student})



@csrf_exempt
def student_data_delete(request):
    sid = request.GET.get('sid')
    #print(sid)
    StudentData.objects.filter(sid=sid).delete()
    student = StudentData.objects.all()

    return render(request,'dashboard.html',{'student':student})


@csrf_exempt
def logout(request):
    try:

        del request.session['mobile']

        return HttpResponseRedirect('/login/')
    except KeyError:
        return HttpResponseRedirect('/login/')







