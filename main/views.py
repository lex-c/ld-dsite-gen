from django.shortcuts import render, get_object_or_404, get_list_or_404
from django.http import JsonResponse
from django.db import models
from django.db.models.fields import CharField
from django.contrib.postgres.aggregates.general import ArrayAgg, ArrayField 
from django.contrib.admin.views.decorators import staff_member_required
from django.views.decorators.csrf import csrf_exempt
import os
import requests
import json
import uuid
from datetime import datetime, timedelta
import time
import pytz
import random, string
import itertools
from django.contrib.auth.models import User
from .models import Pic, PicForm, Tag, UserInterestDF
from . import gAnal, ml
import io, base64
import pandas as pd
import numpy as np
import cv2
pd.set_option('display.max_rows', None)
pd.set_option('display.max_columns', None)

import firebase_admin
from firebase_admin import storage, credentials

# needs to be above firebase_initialize_app or that throws exception for running twice???
def generate_random_string():
  return ''.join(random.choice(string.ascii_letters + string.digits) for _ in range(8))

def run_once_every_five_calls(f):
  n = itertools.cycle([1,2,5])
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
  print('----------------a-----------------')
  pass

# Create your views here.
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

fb_cred = credentials.Certificate(os.path.join(BASE_DIR, 'main', 'client_secrets.json'))
default_app = firebase_admin.initialize_app(fb_cred, {
  'storageBucket': 'ld-dsite-gen.appspot.com'
})

bucket = storage.bucket('ld-dsite-gen.appspot.com')

def get_all_pics_db():
  all_pics_db = list(Pic.objects.all().values_list('pic_name', 'tag__tag_name', 'tag__intensity'))
  return all_pics_db

def get_or_update_user_df(request):
  current_user_df = pd.DataFrame(index=[])
  try:
    current_user_df = pd.read_pickle(os.path.join(BASE_DIR, 'main', 'templates', 'main', 'react-front', 'build', 'static', 'media', f'user_{request.user.id}_df.pkl'))
  except Exception as e:
    print(e)
    pass
  all_pics_db = get_all_pics_db()
  names_pics_db = set([sub_list[0] for sub_list in all_pics_db])
  names_pics_df = set(list(current_user_df.index))
  print('curr df before fix:    ', current_user_df)
  if names_pics_db != names_pics_df:
    new_current_user_df = ml.clean_db_data(all_pics_db)
    for name in names_pics_db:
      if name in names_pics_df:
        new_current_user_df['interest'][name] = current_user_df['interest'][name]
    current_user_df = new_current_user_df.sort_values(by=['interest'], axis=0, ascending=False, na_position='last')
  print('curr df after edit:     ', current_user_df)
  return current_user_df

def add_new_output_to_df(user_df, ga_data_dict):
  for pic_name in list(ga_data_dict.keys()):
    user_df['interest'][pic_name] = ga_data_dict[pic_name]
  return user_df

def index(request):
  return render(request, 'main/react-front/build/index.html')

# expiration doesnt work for the png image
def send_pics_front(request):
  current_user_df = get_or_update_user_df(request)
  raw_ga_data = gAnal.get_ga_data()
  all_pics_names = list(current_user_df.index)
  cleaned_ga_data = gAnal.clean_ga_data(raw_ga_data, all_pics_names)
  if cleaned_ga_data:
    current_user_df = add_new_output_to_df(current_user_df, cleaned_ga_data)
    current_user_df = ml.train_model_predict(current_user_df)
    sorted_df = current_user_df.sort_values(by=['interest'], axis=0, ascending=False, na_position='last')
    sorted_df.to_pickle(os.path.join(BASE_DIR, 'main', 'templates', 'main', 'react-front', 'build', 'static', 'media', f'user_{request.user.id}_df.pkl'))
    save_user_df_to_db(request.user, sorted_df)
    all_pics_names = list(sorted_df.index)
  picsData = { "picsData": [  ] }
  for name in all_pics_names:
    blob = bucket.blob(f'pics/{name}')
    exp_time = datetime.utcnow() + timedelta(seconds=10)
    url = blob.generate_signed_url(expiration=exp_time)
    picsData["picsData"].append([name, url])
  return JsonResponse(picsData)

@csrf_exempt
def add_pics_db_fb(request):
  data = { "data" : "b" }
  db_info_blob = request.FILES.get('dbInfo')
  str_json_b = str(db_info_blob.read())
  str_json = str_json_b[2:-1]
  db_info = json.loads(str_json)
  pics = request.FILES.getlist('file')
  for index, pic in enumerate(pics):
    blob = bucket.blob(f'pics/{pic.name}')
    blob.content_type = f'image/{pic.name.split(".")[-1]}'
    blob.upload_from_file(pic.file)
    pic_db = Pic.objects.create(pic_name=pic.name, description=db_info["descriptions"][pic.name])
    if db_info["tagslists"][pic.name]:
      tags = [Tag.objects.create(tag_name=tag, intensity=100, pics=pic_db) for tag in db_info["tagslists"][pic.name]]
    for tag in tags:
      tag.save()
    pic_db.save()
  return JsonResponse(data)


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
