from django.contrib import admin

from MyApp.models import *



class RegistrationAdmin(admin.ModelAdmin):
    list_display = ('name','email','mobile')
    search_fields = ['name']

admin.site.register(Registration,RegistrationAdmin)
admin.site.register(StudentData)
admin.site.register(Marks)
admin.site.register(Image)