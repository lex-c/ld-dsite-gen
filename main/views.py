from django.shortcuts import render, get_object_or_404, get_list_or_404
from django.http import JsonResponse, HttpResponse
from django.db import models
from django.db.models.fields import CharField 
from django.contrib.auth.models import User
from django.contrib.admin.views.decorators import staff_member_required
from django.views.decorators.csrf import csrf_exempt
from .models import Pic, PicForm, Tag, UserInterestDF
from . import gAnal, ml
from pprint import pprint
import os
import requests
import json
import io, base64
import uuid
from datetime import datetime, timedelta
import time
import pytz
import random, string
import itertools
import pandas as pd
import numpy as np
import cv2
import firebase_admin
from firebase_admin import storage, credentials

pd.set_option('display.max_rows', None)
pd.set_option('display.max_columns', None)


# needs to be above firebase_initialize_app or that throws exception for running twice???
def generate_random_string():
  return ''.join(random.choice(string.ascii_letters + string.digits) for _ in range(8))

def run_once_every_five_calls(f):
  n = itertools.cycle([1, 2, 3, 4, 5])
  def wrapper(*args, **kwargs):
    if n.__next__() == 5:
      return f(*args, **kwargs)
    else:
      print('skipping')
  return wrapper

@run_once_every_five_calls
def save_user_df_to_db(current_user, current_user_df):
  json_df = current_user_df.to_json()
  if User.objects.filter(pk=current_user.id).count() == 0:
    username = generate_random_string()
    user_db = User.objects.create_user(username=username)
  else:
    user_db = User.objects.get(pk=current_user.id)
  current_user_df_db = UserInterestDF.objects.filter(user=user_db)
  if current_user_df_db.count() == 0:
    new_df_to_user = UserInterestDF.objects.create(user_df=json_df, user=user_db)
  else:
    current_user_df_db.update(user_df=json_df)
  pass

# Create your views here.
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

fb_cred = credentials.Certificate(os.path.join(BASE_DIR, 'main', 'client_secrets.json'))
default_app = firebase_admin.initialize_app(fb_cred, {
  'storageBucket': 'ld-dsite-gen.appspot.com'
})

bucket = storage.bucket()

def get_all_pics_db():
  all_pics_db = list(Pic.objects.all().values_list('pic_name', 'tag__tag_name', 'tag__intensity'))
  return all_pics_db

def get_or_update_user_df(user):
  current_user_df = pd.DataFrame(index=[])
  try:
    current_user_df = pd.read_pickle(os.path.join(BASE_DIR, 'main', 'templates', 'main', 'react-front', 'build', 'static', 'media', f'user_{user.id}_df.pkl'))
  except Exception as e:
    print(e)
    pass
  all_pics_db = get_all_pics_db()
  names_pics_db = set([sub_list[0] for sub_list in all_pics_db])
  names_pics_df = set(list(current_user_df.index))
  # print('curr df before fix:    ', current_user_df)
  if names_pics_db != names_pics_df:
    new_current_user_df = ml.clean_db_data(all_pics_db)
    for name in names_pics_db:
      if name in names_pics_df:
        new_current_user_df['interest'][name] = current_user_df['interest'][name]
    current_user_df = new_current_user_df.sort_values(by=['interest'], axis=0, ascending=False, na_position='last')
  # print('curr df after edit:     ', current_user_df)
  return current_user_df

def add_new_output_to_df(user_df, ga_data_dict):
  for pic_name in list(ga_data_dict.keys()):
    user_df['interest'][pic_name] = ga_data_dict[pic_name]
  return user_df

def index(request):
  return render(request, 'main/react-front/build/index.html')

def get_update_analysis(request):
  current_user_df = get_or_update_user_df(request.user)
  # will have to be per user as well eventually
  raw_ga_data = gAnal.get_ga_data()
  all_pics_names = list(current_user_df.index)
  cleaned_ga_data = gAnal.clean_ga_data(raw_ga_data, all_pics_names)
  pics_int_dict = { "initial": "none" }
  if cleaned_ga_data:
    current_user_df = add_new_output_to_df(current_user_df, cleaned_ga_data)
    current_user_df = ml.train_model_predict(current_user_df)
    sorted_df = current_user_df.sort_values(by=['interest'], axis=0, ascending=False, na_position='last')
    sorted_df.to_pickle(os.path.join(BASE_DIR, 'main', 'templates', 'main', 'react-front', 'build', 'static', 'media', f'user_{request.user.id}_df.pkl'))
    save_user_df_to_db(request.user, sorted_df)
    all_pics_names = list(sorted_df.index)
    pics_int_dict = { index: row['interest'] for index, row in sorted_df.iterrows() }
    # pprint(pics_int_dict)
  return JsonResponse(pics_int_dict)
# expiration doesnt work for the png image
def send_pics_front(request):
  all_pics_list = get_all_pics_db()
  all_pics_names = list(set([sublist[0] for sublist in all_pics_list]))
  print("pics_name_before:     ", all_pics_names)
  try:
    current_user_df = pd.read_pickle(os.path.join(BASE_DIR, 'main', 'templates', 'main', 'react-front', 'build', 'static', 'media', f'user_{request.user.id}_df.pkl'))
    if set(list(current_user_df.index)) == set(all_pics_names):
      all_pics_names = list(current_user_df.index)
  except Exception as e:
    print(e)
    pass
  # all_pics_names = get_update_analysis(request)
  print("pics_names_after:     ", all_pics_names)
  picsData = { "picsData": [  ] }
  for name in all_pics_names:
    blob = bucket.blob(f'pics/{name}')
    exp_time = datetime.utcnow() + timedelta(minutes=30)
    url = blob.generate_signed_url(expiration=exp_time)
    print("url:----------------------------", url)
    picsData["picsData"].append([name, url])
  return JsonResponse(picsData)

@csrf_exempt
def add_pics_db_fb(request):
  data = { "data" : "b" }
  db_info_blob = request.FILES.get('dbInfo')
  db_info_bytes = db_info_blob.read()
  db_info_unicode = db_info_bytes.decode('utf-8')
  db_info = json.loads(db_info_unicode)
  pics = request.FILES.getlist('file')
  for index, pic in enumerate(pics):
    blob = bucket.blob(f'pics/{pic.name}')
    blob.content_type = f'image/{pic.name.split(".")[-1]}'
    blob.upload_from_file(pic.file)
    pic_db = Pic(pic_name=pic.name, description=db_info["descriptions"][pic.name])
    pic_db.save()
    pic_tagslist = db_info["tagslists"][pic.name]
    tags = []
    if pic_tagslist:
      if len(pic_tagslist) > 0:
        tags = [Tag(tag_name=tag_info[0], intensity=tag_info[1], pics=pic_db) for tag_info in pic_tagslist if tag_info[0]]
    for tag in tags:
      tag.save()
  return JsonResponse(data)

@csrf_exempt
def remove_pic_db_fb(request):
  unicode = request.body.decode('utf-8')
  picName = json.loads(unicode)['picName']
  picList = None
  try:
    picList = Pic.objects.filter(pic_name=picName)
    picList.delete()
  except Exception as e:
    print(e)
    return JsonResponse({"error": "db"})
  try:
    blob = bucket.blob(f'pics/{picName}')
    blob.delete()
  except Exception as e:
    print(e)
    if blob.exists():
      print("exists")
      Pic.objects.create(picList[0])
    return JsonResponse({"error": "fb"})
  return JsonResponse({"a": "b"})


def get_all_users(request):
  all_users_id = list(User.objects.all().values_list('pk'))
  return JsonResponse({ 'allUsers': all_users_id })


def get_user_info(request):
  all_users_id_and_df = list(User.objects.all().select_related("userinterestdf").values_list('pk', "userinterestdf__user_df"))
  def json_to_df_map(tuple):
    if tuple[1]:
      df = pd.read_json(tuple[1])
      print(df)
      user_int_dict = {  }
      for name in list(df.index):
        user_int_dict[name] = int(df['interest'][name])
      return (tuple[0], json.dumps(user_int_dict))
    else:
      return tuple
  all_users_id_and_df = list(map(json_to_df_map, all_users_id_and_df))
  print(all_users_id_and_df)
  return JsonResponse({"allUsers": all_users_id_and_df})

def get_user_int_prediction(request, user_id, query_tags):
  query_tags = query_tags.split('dfg67dfg')[1:]
  def tags_map(tag_set):
    return tag_set.split('rt45rt')
  query_tags = list(map(tags_map, query_tags))
  user_df_json = list(User.objects.filter(pk=user_id).select_related('userinterestdf').values_list('userinterestdf__user_df'))[0][0]
  user_df = pd.read_json(user_df_json)
  tags_in_df = list(user_df.columns)[:-1]
  cleaned_query_tags = ml.clean_query_tags(tags_in_df, query_tags)
  predicted_interest = ml.predict_interest(user_df, cleaned_query_tags)
  return JsonResponse({'predictedInterest': predicted_interest})


@staff_member_required(login_url='admin:login', redirect_field_name='next')
def add_pics_view(request):
  if request.method == 'POST':
    print(request.POST['images'])
    print(request.FILES)
    blob = bucket.get_blob(f'pics/pic.jpeg')
    blob.upload_from_file(request.FILES)
  form = PicForm()
  return render(request, 'main/non-react-templates/admin-pics.html', {'form': form})





if __name__ == "__main__":
  pass
