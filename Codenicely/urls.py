"""Codenicely URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from MyApp import views
from django.conf.urls import url
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('admin/', admin.site.urls),

    path('',views.login),
    url(r'^login/$',views.login),
    url(r'^base/$',views.base),
    url(r'^loginUser/$',views.loginUser),
    url(r'^registration/$',views.registration),
    url(r'^dashboard/$',views.dashboard),
    url(r'^register_data_store/$',views.register_data_store),
    url(r'^profile_update/$',views.profile_update),
    url(r'^admin_reg_success/$',views.admin_reg_success),
    url(r'^admin_reg_failure/$',views.admin_reg_failure),
    url(r'^material/$',views.material),
    url(r'^studentpage/$',views.studentpage),
    url(r'^student_data_store/$',views.student_data_store),
    url(r'^student_data_update/$',views.student_data_update),
    url(r'^student_data_delete/$',views.student_data_delete),
    url(r'^student_profile/$',views.student_profile),
    url(r'^add_marks/$',views.add_Marks),
    url(r'^marks/$',views.marks),
    url(r'^update_marks/$',views.update_marks),
    url(r'^imageuploadpage/$',views.imageuploadpage),
    url(r'^imageupload/$',views.imageupload),
    url(r'^imageshowpage/$',views.imageshowpage),






    url(r'^resetPage/$',views.resetpage),
    url(r'^generate_otp/$',views.generate_otp),
    url(r'^verify_password_page/$',views.verify_password_page),
    url(r'^verify_password/$',views.verify_password),


    url(r'^logout/$',views.logout),



]+ static(settings.MEDIA_URL, document_root= settings.MEDIA_ROOT)
