from random import randint

from django.http import HttpResponseRedirect, HttpResponse, JsonResponse, Http404
from django.shortcuts import render
from django.views.decorators.csrf import *
from setuptools.command.saveopts import saveopts
from django.core.mail import send_mail
from Codenicely import settings as em

from .models import *
from django.contrib.auth.decorators import login_required


def login(request):
    try:
        id = request.session['id']
        print(id)
        if id:
            return HttpResponseRedirect('/dashboard/')
        else:
            return render(request, 'login.html')
    except KeyError:
        return render(request, 'login.html')


def base(request):
    if request.method == "GET":
        try:
            id = request.session['id']
            #print(id)
            login_user = Registration.objects.get(id=id)
            #print(login_user)
            return render(request, 'base.html',{"login_user":login_user})
        except:
            raise Http404("No Login Id Available")


def registration(request):
    return render(request, 'Registration.html')


# @login_required(login_url='/login/')
@csrf_exempt
def dashboard(request):
    response = {}
    # if request.session['id']:
    try:
        id = request.session['id']
        if id:
            # print(id)
            if request.method == "GET":
                login_user = Registration.objects.get(id=id)
                #print(login_user)
                # student_data=StudentData.objects.all()
                return render(request, 'dashboard.html', {"login_user": login_user})


            else:
                records = []

                result = request.POST.get('result')
                #print(result)

                if result == "all":
                    students = StudentData.objects.all()

                else:
                    #student = Marks.objects.filter(result__iexact=result)
                    students = StudentData.objects.filter(roll_no__in = [obj for obj in Marks.objects.filter(result__iexact=result).values_list('student__roll_no', flat=True)])


                for student in students:
                    student_rec = {
                        "id": student.id,
                        "roll_no": student.roll_no,
                        "name": student.name,
                        "email": student.email,
                        "mobile": student.mobile,
                        "gender": student.gender,
                        "dob": student.dob.strftime('%d-%m-%y'),
                        "address": student.address
                    }
                    records.append(student_rec)
                response['success'] = True
                response['student_records'] = records
                # print(response)
                # pickup_records = {"record":records}
                return JsonResponse(response)


        elif not id:
            return HttpResponseRedirect('/login/')
    except KeyError:
        return HttpResponseRedirect('/login/')

    # try:
    #     id = request.session['id']
    #     #print(id)
    #     if id:
    #         student = StudentData.objects.all()
    #         data = Registration.objects.filter(id=id).all()
    #         return render(request, 'dashboard.html', {"data": data, 'students': student})
    #     else:
    #         return HttpResponseRedirect('/login/')
    #
    #
    # except KeyError as e:
    #     return HttpResponseRedirect('/login/')


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


# @login_required(login_url='/login/')
@csrf_exempt
def loginUser(request):
    response = {}

    if request.method == "POST":
        mobile = request.POST['mobile']
        password = request.POST['password']
        try:
            login = Registration.objects.get(mobile=mobile, password=password)
            request.session['id'] = login.id
            if login:
                response['success'] = True
                return JsonResponse(response)
                # return HttpResponseRedirect('/dashboard/')
            else:
                response['success'] = False
                return JsonResponse(response)
        except Exception as e:
            print("Login Error")

        return JsonResponse(response)


@csrf_exempt
def register_data_store(request):
    response = {}
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
        # reg = Registration.objects.create(name=name,email=email,mobile=mobile,gender=gender,password=password)

        mobile_exist = Registration.objects.filter(mobile=mobile).exists()
        email_exist = Registration.objects.filter(email=email).exists()
        # print(mobile_exist)
        # print(email_exist)
        if mobile_exist == True:
            print(mobile_exist)
            response['mobile_exist'] = mobile_exist
            response['success'] = False
            return JsonResponse(response)
        elif email_exist == True:
            print(email_exist)
            response['email_exist'] = email_exist
            response['success'] = False
            return JsonResponse(response)

        else:
            Registration.objects.create(name=name, email=email, mobile=mobile, gender=gender, password=password)
            response['success'] = True
            return JsonResponse(response)


    else:
        return render(request, 'Registration.html', {'status': "Not Store Data In Database"})


@csrf_exempt
def profile_update(request):
    # student = StudentData.objects.all()
    response = {}
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
            update = Registration.objects.filter(id=id).update(mobile=mobile, name=name, email=email, password=password)
            if update:
                response['success'] = True
                return JsonResponse(response)
            else:
                response['success'] = False
                return JsonResponse(response)
        except Exception as e:
            raise Http404

def admin_reg_success(request):
    return render(request,'admin_reg_success.html')
def admin_reg_failure(request):
    return render(request,'admin_reg_failure.html')

def material(request):
    return render(request, 'material.html')


def studentpage(request):
    id = request.GET.get('id')
    login_user_id = request.session['id']
    login_user = Registration.objects.get(id=login_user_id)

    # print(sid)
    student = StudentData.objects.filter(id=id)
    return render(request, 'studentpage.html', {'student': student,'login_user':login_user})


@csrf_exempt
def student_data_store(request):
    response = {}
    if request.method == "POST":
        image = request.FILES.get('image')
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

        obj = StudentData.objects.filter(roll_no=roll).exists()
        print(obj)
        if obj:
            response['roll_exist'] = True
            response['success'] = False
            return JsonResponse(response)
        else:
            StudentData.objects.create(student_img=image, roll_no=roll, name=name, email=email, mobile=mobile,
                                       password=password,
                                       gender=gender, dob=dob, address=address)
            response['roll_exist'] = False
            response['success'] = True
            return JsonResponse(response)





    else:
        return render(request, 'studentpage.html', {'status1': "Record Not Store"})


@csrf_exempt
def student_data_update(request):
    response = {}
    if request.method == "POST":
        id = request.POST.get('id')
        roll_no = request.POST.get('roll_no')
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

        std = StudentData.objects.filter(id=id).update(roll_no=roll_no, name=name, email=email, mobile=mobile,
                                                       password=password, dob=dob, address=address)
        # print(std)
        # std = StudentData.objects.filter(roll_no=roll_no).exists()

        if std:
            response['success'] = True
            return JsonResponse(response)
        else:
            response['success'] = False
            return JsonResponse(response)


@csrf_exempt
def student_profile(request):
    response = {}
    records = []
    result = ""
    sid = request.POST.get('id')
    student = StudentData.objects.get(id=sid)
    marks = Marks.objects.get(student=student)
    # print(marks.result)
    # print(student.name)
    student_img = ""
    if student.student_img == None:
        student_img = ""
        #print('image',student.student_img)
    else:
        student_img = student.student_img

    if marks.result == None:
        result = "Not Assign"
    else:
        result = marks.result

    records = {
        "image": student_img,
        "roll_no": student.roll_no,
        "name": student.name,
        "email": student.email,
        "mobile": student.mobile,
        "gender": student.gender,
        "dob": student.dob.strftime('%d-%m-%y'),
        "address": student.address,
        "result": result,
    }
    response['success'] = True
    response['student_rec'] = records
    # print(response)
    return JsonResponse(response)


@csrf_exempt
def student_data_delete(request):
    response = {}
    if request.method == "POST":
        id = request.POST.get('sid')
        # print(id)
        StudentData.objects.filter(id=id).delete()
        response['success'] = True
        return JsonResponse(response)
    # StudentData.objects.filter(id=id).delete()
    # return HttpResponseRedirect('/dashboard/')


@csrf_exempt
def add_Marks(request):
    response = {}
    if request.method == "POST":
        sid = request.POST.get('sid')
        roll_no = request.POST.get('roll_no')
        math = request.POST.get('math')
        science = request.POST.get('science')
        socal = request.POST.get('socal')
        english = request.POST.get('english')
        hindi = request.POST.get('hindi')
        sanskrit = request.POST.get('sanskrit')
        obtain = request.POST.get('obtain')
        percentage = request.POST.get('percentage')
        result = request.POST.get('result')

        # print(sid)
        # print(roll_no)
        # print(math)
        # print(science)
        # print(socal)
        # print(english)
        # print(hindi)
        # print(sanskrit)
        # print(obtain)
        # print(percentage)
        # print(result)
        # response['success']=True
        # return JsonResponse(response)

        id = StudentData.objects.get(id=sid)
        # print(id)
        marks = Marks.objects.create(student=id, roll_no=roll_no, math=math, science=science, socal=socal,
                                     english=english, hindi=hindi, sanskrit=sanskrit, obtain=obtain,
                                     percentage=percentage, result=result)
        # print(marks)
        if marks:
            response['success'] = True
            return JsonResponse(response)
        else:
            response['success'] = False
            return JsonResponse(response)
    else:
        return HttpResponseRedirect('/dashboard/')


def marks(request):
    id = request.session['id']
    #print(id)
    if not id:
        try:
            return HttpResponseRedirect('/login/')
        except KeyError:
            return HttpResponseRedirect('/login/')
    else:
        try:
            sid = request.GET.get('sid')
            login_user = Registration.objects.get(id=id)
            marks = Marks.objects.filter(student_id=sid)
            return render(request, 'marks.html', context={'mark': marks, 'login_user': login_user})
        except KeyError:
            return HttpResponseRedirect('/login/')




@csrf_exempt
def update_marks(request):
    if request.method == "POST":
        response = {}
        sid = request.POST.get('sid')
        roll_no = request.POST.get('roll_no')
        math = request.POST.get('math')
        science = request.POST.get('science')
        socal = request.POST.get('socal')
        english = request.POST.get('english')
        hindi = request.POST.get('hindi')
        sanskrit = request.POST.get('sanskrit')
        obtain = request.POST.get('obtain')
        percentage = request.POST.get('percentage')
        result = request.POST.get('result')
        # print(sid)
        # print(roll_no)
        # print(math)
        # print(science)
        # print(socal)
        # print(english)
        # print(hindi)
        # print(sanskrit)
        # print(obtain)
        # print(percentage)
        # print(result)
        # response['success'] = True
        # return JsonResponse(response)
        marks = Marks.objects.filter(student_id=sid, roll_no=roll_no).update(math=math, science=science, socal=socal,
                                                                             english=english, hindi=hindi,
                                                                             sanskrit=sanskrit, obtain=obtain,
                                                                             percentage=percentage, result=result)
        # print(marks)
        if marks:
            response['success'] = True
            return JsonResponse(response)
        else:
            response['success'] = False
            return JsonResponse(response)


# image upload
@csrf_exempt
def imageuploadpage(request):
    return render(request, 'imageupload.html')


@csrf_exempt
def imageupload(request):
    response = {}
    if request.method == "POST":
        image = request.FILES.get('file')
        mobile = request.POST.get('mobile')
        res = Image(mobile=mobile, image=image)
        if res:
            res.save()
            response['success'] = True
            return JsonResponse(response)
        else:
            response['success'] = False
            return JsonResponse(response)


@csrf_exempt
def imageshowpage(request):
    data = Image.objects.all()
    return render(request, 'imageshow.html', {'data': data})


def resetpage(request):
    n = 6
    range_start = 10 ** (n - 1)
    range_end = (10 ** n) - 1
    otp = randint(range_start, range_end)
    return render(request, 'generate_otp.html', {'otp':otp})


@csrf_exempt
def generate_otp(request):
    response = {}
    if request.method == "POST":
        email = request.POST.get('email')
        otp = request.POST.get('otp')
        print(email)
        print(otp)
        login_user = Registration.objects.filter(email=email).exists()
        print(login_user)
        if login_user:
            request.session['email']=email
            Registration.objects.filter(email=email).update(otp=otp)
            send_mail("Otp Data", otp, em.EMAIL_HOST_USER, [email], fail_silently=False)
            response['success']=True
            return JsonResponse(response)
        else:
            response['success']=False
            return JsonResponse(response)
        # try:
        #     reg = Registration.objects.filter(mobile=mobile).update(password=password)
        #     if reg:
        #         response['success'] = True
        #         return JsonResponse(response)
        #     else:
        #         response['success'] = False
        #         return JsonResponse(response)
        # except Exception as e:
        #     raise Http404


    else:
        return render(request, 'generate_otp.html')


def verify_password_page(request):
    return render(request,'verify_password.html')



@csrf_exempt
def verify_password(request):
    response={}
    if request.method == "POST":
        email = request.session['email']
        otp = request.POST.get('otp')
        password = request.POST.get('password')
        print(email)
        print(otp)
        print(password)
        login_otp = Registration.objects.filter(otp=otp).exists()
        if login_otp:
            Registration.objects.filter(email=email).update(password=password)
            response['success'] = True
            return JsonResponse(response)
        else:
            response['success']=False
            return JsonResponse(response)
    else:
        return render(request,'verify_password.html')





@csrf_exempt
def logout(request):
    try:
        del request.session['id']
        del request.session['email']
        return HttpResponseRedirect('/login/')
    except KeyError:
        return HttpResponseRedirect('/login/')
