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
import pytz
from .models import Pic, PicForm, Tag, FBFileUpload
from . import gAnal, ml
import io, base64
import pandas as pd
import numpy as np
import cv2
pd.set_option('display.max_rows', None)
pd.set_option('display.max_columns', None)

import firebase_admin
from firebase_admin import storage, credentials

# Create your views here.
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

fb_cred = credentials.Certificate(os.path.join(BASE_DIR, 'main', 'client_secrets.json'))
default_app = firebase_admin.initialize_app(fb_cred, {
  'storageBucket': 'ld-dsite-gen.appspot.com'
})

bucket = storage.bucket('ld-dsite-gen.appspot.com')
eastern = pytz.timezone('US/Eastern')


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


def send_pics_front(request):
  current_user_df = get_or_update_user_df(request)
  raw_ga_data = gAnal.get_ga_data()
  all_pics_names = list(current_user_df.index)
  cleaned_ga_data = gAnal.clean_ga_data(raw_ga_data, all_pics_names)
  if cleaned_ga_data:
    print('------------------------')
    print('------------------------')
    print('------------------------')
    print(cleaned_ga_data)
    current_user_df = add_new_output_to_df(current_user_df, cleaned_ga_data)
    current_user_df = ml.train_model_predict(current_user_df)
    sorted_df = current_user_df.sort_values(by=['interest'], axis=0, ascending=False, na_position='last')
    sorted_df.to_pickle(os.path.join(BASE_DIR, 'main', 'templates', 'main', 'react-front', 'build', 'static', 'media', f'user_{request.user.id}_df.pkl'))
    all_pics_names = list(sorted_df.index)
  exp_time = datetime.now() + timedelta(minutes=2)
  exp_time = eastern.localize(exp_time)
  picsData = { "picsData": [  ] }
  for name in all_pics_names:
    blob = bucket.blob(f'pics/{name}')
    url = blob.generate_signed_url(expiration=exp_time)
    picsData["picsData"].append([name, url])
  return JsonResponse(picsData)

@csrf_exempt
def add_pics_db_fb(request):
  data = { "data" : "b" }
  pics = request.FILES.getlist('file')
  for pic in pics:
    blob = bucket.blob(f'pics/{pic}')
    blob.content_type = f'image/{pic.split(".")[-1]}'
    blob.upload_from_file(pic.file)
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
