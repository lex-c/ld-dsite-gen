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
    path('api/get-all-users', views.get_all_users, name='get_all_users'),
    path('api/get-user-info/', views.get_user_info, name='get_user_info'),
    path('api/get-user-interest-prediction/<str:user_id>/<str:query_tags>/', views.get_user_int_prediction, name='get_user_int_prediction')
]