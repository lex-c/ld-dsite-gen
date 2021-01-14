from django.urls import path
from . import views

app_name = 'main'
urlpatterns = [
    path('', views.index, name='index'),
    path('admin-add-pics/', views.add_pics_view, name="admin_add_pics"),
    path('api/get-pics/', views.send_pics_front, name='send_pics_front'),
    path('api/add-pics/', views.add_pics_db_fb, name='add_pics_db_fb')
]