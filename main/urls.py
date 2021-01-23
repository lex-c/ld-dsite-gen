from django.urls import path
from . import views

app_name = 'main'
urlpatterns = [
    path('', views.index, name='index'),
    path('admin-add-pics/', views.add_pics_view, name="admin_add_pics"),
    path('api/get-pics/', views.send_pics_front, name='send_pics_front'),
    path('api/get-analysis/', views.get_update_analysis, name='get_update_analysis'),
    path('api/add-pics/', views.add_pics_db_fb, name='add_pics_db_fb'),
    path('api/remove-pic/', views.remove_pic_db_fb, name='remove_pic_db_fb'),
    path('api/get-users/', views.get_users_list, name='get_users_list'),
]