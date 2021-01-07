from django.shortcuts import render, get_object_or_404, get_list_or_404
from django.http import JsonResponse
from django.contrib.admin.views.decorators import staff_member_required
import requests
import json
from datetime import datetime, timedelta
import pytz
from .models import Pic, PicForm

import firebase_admin
from firebase_admin import storage, credentials
from google.analytics.data import AlphaAnalyticsDataClient
from google.analytics.data_v1alpha.types import DateRange
from google.analytics.data_v1alpha.types import Dimension
from google.analytics.data_v1alpha.types import Entity
from google.analytics.data_v1alpha.types import Metric
from google.analytics.data_v1alpha.types import RunReportRequest, RunRealtimeReportRequest
# Create your views here.


PROPERTY_ID = "properties/257302691"
cred = credentials.Certificate('/Users/ls/Documents/code/mijn_site/main/client_secrets.json')
default_app = firebase_admin.initialize_app(cred, {
  'storageBucket': 'ld-dsite-gen.appspot.com'
})

bucket = storage.bucket()
eastern = pytz.timezone('US/Eastern')
def get_bucket_info():
  exp_time = datetime.now() + timedelta(minutes=1)
  exp_time = eastern.localize(exp_time)
  blob = bucket.blob('pics/32-323738_sexy-girl-vector-png-image-sexy-girl-vector.png')
  url = blob.generate_signed_url(expiration=exp_time)
  print(url)




def index(request):
  client = AlphaAnalyticsDataClient()
  g_request = RunRealtimeReportRequest(
                            property=PROPERTY_ID,
                            dimensions=[Dimension(name='eventName')],
                            metrics=[Metric(name='eventCount')],
                            limit=-1
                            )
  response = client.run_realtime_report(g_request)
  print('results:')
  for row in response.rows:
      print(row.dimension_values[0].value, row.metric_values[0].value)
  return render(request, 'main/react-front/build/index.html')

def send_pics_front(request):
  print('in the send_pics_front')
  exp_time = datetime.now() + timedelta(minutes=2)
  exp_time = eastern.localize(exp_time)
  pic_names = list(Pic.objects.all().values_list('name', flat=True))
  picsData = { "picsData": [  ] }
  for name in pic_names:
    blob = bucket.blob(f'pics/{name}')
    url = blob.generate_signed_url(expiration=exp_time)
    picsData["picsData"].append([name, url])
  return JsonResponse(picsData)


@staff_member_required(login_url='admin:login', redirect_field_name='next')
def add_pics_view(request):
  form = PicForm()
  return render(request, 'main/admin-pics.html', {'form': form})

if __name__ == "__main__":
  get_bucket_info()
