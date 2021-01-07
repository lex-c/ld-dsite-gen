from django.urls import path
from . import views

app_name = 'main'
urlpatterns = [
    path('', views.index, name='index'),
    path('api/get-pics/', views.send_pics_front, name='send_pics_front')
]