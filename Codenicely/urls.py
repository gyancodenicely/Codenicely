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

urlpatterns = [
    path('admin/', admin.site.urls),
    url(r'login/$',views.login),
    url(r'^loginUser/$',views.loginUser),
    url(r'^registration/$',views.registration),
    url(r'^register_data_store/$',views.register_data_store),
    url(r'^profile_update/$',views.profile_update),
    url(r'^material/$',views.material),
    url(r'^studentpage/$',views.studentpage),
    url(r'^student_data_store/$',views.student_data_store),

    url(r'^student_data_update/$',views.student_data_update),
    url(r'^student_data_delete/$',views.student_data_delete),


    url(r'^$',views.textExample),
]
