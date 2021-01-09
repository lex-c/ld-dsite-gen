from django.shortcuts import render, get_object_or_404, get_list_or_404
from django.http import JsonResponse
from django.db import models
from django.db.models.fields import CharField
from django.contrib.postgres.aggregates.general import ArrayAgg, ArrayField 
from django.contrib.admin.views.decorators import staff_member_required
import os
import requests
import json
from datetime import datetime, timedelta
import pytz
from .models import Pic, PicForm, Tag
from . import gAnal, ml

import pandas as pd
import numpy as np
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

bucket = storage.bucket()
eastern = pytz.timezone('US/Eastern')
all_pics_db = []
current_user_df = None

def get_all_pics_db():
  all_pics_db = list(Pic.objects.all().values_list('pic_name', 'tag__tag_name', 'tag__intensity'))
  return all_pics_db

def add_new_output_to_df(ga_data_dict):
  global current_user_df
  for pic_name in list(ga_data_dict.keys()):
    current_user_df['interest'][pic_name] = ga_data_dict[pic_name]


def index(request):
  global all_pics_db, current_user_df
  all_pics_db = get_all_pics_db()
  current_user_df = ml.clean_db_data(all_pics_db)
  return render(request, 'main/react-front/build/index.html')


def send_pics_front(request):
  print('in the back send pics')
  global current_user_df
  raw_ga_data = gAnal.get_ga_data()
  all_pics_names = list(set([sub_list[0] for sub_list in all_pics_db]))
  print('names:    ', all_pics_names)
  print('df:    ', current_user_df)
  cleaned_ga_data = gAnal.clean_ga_data(raw_ga_data, all_pics_names)
  if cleaned_ga_data:
    add_new_output_to_df(cleaned_ga_data)
    current_user_df = ml.train_model_predict(current_user_df)
    sorted_df = current_user_df.sort_values(by=['interest'], axis=0, ascending=False, na_position='last')
    all_pics_names = list(sorted_df.index)
  exp_time = datetime.now() + timedelta(minutes=2)
  exp_time = eastern.localize(exp_time)
  picsData = { "picsData": [  ] }
  for name in all_pics_names:
    blob = bucket.blob(f'pics/{name}')
    url = blob.generate_signed_url(expiration=exp_time)
    picsData["picsData"].append([name, url])
  print(picsData)
  return JsonResponse(picsData)


@staff_member_required(login_url='admin:login', redirect_field_name='next')
def add_pics_view(request):
  form = PicForm()
  return render(request, 'main/admin-pics.html', {'form': form})



if __name__ == "__main__":
  pass
