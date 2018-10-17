from django.http import HttpResponseRedirect, HttpResponse, JsonResponse, Http404
from django.shortcuts import render
from django.views.decorators.csrf import *
from .models import *
from django.contrib.auth.decorators import login_required


def login(request):
    try:
        mobile = request.session['mobile']
        if mobile:
            return HttpResponseRedirect('/dashboard/')
        else:
            return render(request, 'login.html')
    except Exception:
        return render(request,'login.html')

def base(request):
    return render(request,'base.html')


def registration(request):
    reg = Registration.objects.all()
    return render(request,'Registration.html',{'reg':reg})
#@login_required(login_url='/login/')

def dashboard(request):

    try:
        id = request.session['id']
        if id:
            student = StudentData.objects.all()
            data = Registration.objects.filter(id=id).all()
            return render(request,'dashboard.html',{"data": data, 'student': student})
        else:
            return HttpResponseRedirect('/login/')


    except KeyError as e:
        return HttpResponseRedirect('/login/')





# def dashboard(request):
#     mobile = request.session['mobile']
#     if mobile:
#         try:
#             if mobile:
#                 student = StudentData.objects.all()
#                 data = Registration.objects.filter(mobile=mobile).all()
#                 return render(request, 'dashboard.html', {"data": data, 'student': student})
#             else:
#                 return HttpResponseRedirect('/login/')
#         except KeyError:
#             raise HttpResponseRedirect('/login/')
#     else:
#         return HttpResponseRedirect('/login/')





#@login_required(login_url='/login/')
@csrf_exempt
def loginUser(request):
    response = {}

    if request.method == "POST":
        mobile = request.POST['mobile']
        password = request.POST['password']
        try:
            login = Registration.objects.get(mobile=mobile,password=password)
            request.session['id'] = login.id
            if login:
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
            response['success']=True
            return JsonResponse(response)
        else:
            response['success']=False
            return JsonResponse(response)


    else:
        return render(request,'Registration.html',{'status':"Not Store Data In Database"})


@csrf_exempt
def profile_update(request):
    #student = StudentData.objects.all()
    response={}
    if request.method == "POST":
        id = request.POST.get('id')
        name = request.POST.get('name')
        email = request.POST.get('email')
        mobile = request.POST.get('mobile')
        password = request.POST.get('password')
        # print(id)
        # print(name)
        # print(email)
        # print(mobile)
        # print(password)
        # response['success']=True
        # return JsonResponse(response)
        try:
            update = Registration.objects.filter(id=id).update(mobile=mobile,name=name,email=email,password=password)
            if update:
                response['success']=True
                return JsonResponse(response)
            else:
                response['success']=False
                return JsonResponse(response)
        except Exception as e:
            raise Http404






def material(request):
    return render(request,'material.html')



def studentpage(request):
    id = request.GET.get('id')
    # print(sid)
    student = StudentData.objects.filter(id=id)
    return render(request, 'studentpage.html',{'student':student})

@csrf_exempt
def student_data_store(request):
    response={}
    if request.method == "POST":
        roll = request.POST.get('roll_no')
        name = request.POST.get('name')
        email = request.POST.get('email')
        mobile = request.POST.get('mobile')
        gender = request.POST.get('gender')
        password = request.POST.get('password')
        dob = request.POST.get('dob')
        address = request.POST.get('address')
        # print(roll_no)
        # print(name)
        # print(email)
        # print(mobile)
        # print(gender)
        # print(password)
        # print(dob)
        # print(address)
        # response['success']=True
        # return JsonResponse(response)

        # try:
        #     reg = StudentData.objects.create(roll_no=roll,name=name,email=email,mobile=mobile,password=password,gender=gender,dob=dob,address=address)
        #     if reg:
        #         response['success'] = True
        #         return JsonResponse(response)
        #     else:
        #         response['success'] = False
        #         return JsonResponse(response)
        #
        # except Exception as ex:
        #     print(ex)
        #     return render(request,'studentpage.html',{'msg':"This ID Already Exist"})
        try:
            obj = StudentData.objects.get(roll_no=roll)
           # print(obj)
        except StudentData.DoesNotExist:
            obj = StudentData.objects.create(roll_no=roll,name=name,email=email,mobile=mobile,password=password,gender=gender,dob=dob,address=address)
            if obj:
                response['success'] = True
                return JsonResponse(response)
            else:
                response['success'] = False
                return JsonResponse(response)


    else:
        return render(request,'studentpage.html',{'status1':"Record Not Store"})



@csrf_exempt
def student_data_update(request):
    response={}
    if request.method == "POST":
        id = request.POST.get('id')
        roll_no= request.POST.get('roll_no')
        name = request.POST.get('name')
        email = request.POST.get('email')
        mobile = request.POST.get('mobile')
        password = request.POST.get('password')
        dob = request.POST.get('dob')
        address = request.POST.get('address')
        # print(sid)
        # print(name)
        # print(email)
        # print(mobile)
        # print(password)
        # print(address)
        # print(dob)
        # response['success']=True
        # return JsonResponse(response)
        try:
            std = StudentData.objects.filter(id=id).update(roll_no=roll_no,name=name, email=email,mobile=mobile,
                                                             password=password,dob=dob, address=address)
            #print(std)
            if std:
                response['success'] = True
                return JsonResponse(response)
            else:
                response['success'] = False
                return JsonResponse(response)
        except Exception as e:
            print(e)



@csrf_exempt
def student_data_delete(request):
    response={}
    if request.method == "POST":
        id = request.POST.get('sid')
        #print(id)
        StudentData.objects.filter(id=id).delete()
        response['success']=True
        return JsonResponse(response)
    #StudentData.objects.filter(id=id).delete()
    #return HttpResponseRedirect('/dashboard/')




@csrf_exempt
def add_Marks(request):
    response={}
    if request.method == "POST":
        id= request.POST.get('id')
        roll_no = request.POST.get('roll_no')
        math = request.POST.get('math')
        science = request.POST.get('science')
        socal = request.POST.get('socal')
        english = request.POST.get('english')
        hindi = request.POST.get('hindi')
        sanskrit = request.POST.get('sanskrit')
        total = request.POST.get('total')
        percentage=request.POST.get('percentage')
        print(id)
        print(roll_no)
        print(math)
        print(science)
        print(socal)
        print(english)
        print(hindi)
        print(sanskrit)
        print(total)
        print(percentage)
        response['success']=True
        return JsonResponse(response)





def resetpage(request):
    reg = Registration.objects.all()
    return render(request,'forget.html',{'reg':reg})

@csrf_exempt
def reset_password(request):
    response={}
    if request.method == "POST":
        mobile = request.POST.get('mobile')
        password = request.POST.get('password')
        # print(mobile)
        # print(password)
        try:
            reg = Registration.objects.filter(mobile=mobile).update(password=password)
            if reg:
                response['success']=True
                return JsonResponse(response)
            else:
                response['success']=False
                return JsonResponse(response)
        except Exception as e:
            raise Http404


    else:
        return render(request,'forget.html')



@csrf_exempt
def logout(request):
    try:
        del request.session['id']
        return HttpResponseRedirect('/login/')
    except KeyError:
        return HttpResponseRedirect('/login/')







