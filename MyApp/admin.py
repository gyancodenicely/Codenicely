from django.contrib import admin

from MyApp.models import *



class RegistrationAdmin(admin.ModelAdmin):
    list_display = ('name','email','mobile','otp','gender','password')
    search_fields = ['name']

admin.site.register(Registration,RegistrationAdmin)

class StudentDataAdmin(admin.ModelAdmin):
    list_display = ('id','student_img','roll_no','name','email','mobile','password','gender','address')
    search_fields = ['name']
admin.site.register(StudentData,StudentDataAdmin)

class MarksAdmin(admin.ModelAdmin):
    list_display = ('student','roll_no','math','science','socal','english','hindi','sanskrit','obtain','percentage','result')
    search_fields = ['roll_no','result']
admin.site.register(Marks,MarksAdmin)

class ImageAdmin(admin.ModelAdmin):
    list_display = ('mobile','image')
    search_fields = ['mobile']
admin.site.register(Image,ImageAdmin)