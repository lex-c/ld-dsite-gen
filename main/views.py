from django.shortcuts import render
from django.contrib.admin.views.decorators import staff_member_required
import requests
import json
import firebase_admin
from .models import Pic, PicForm

# Create your views here.

from google.analytics.data import AlphaAnalyticsDataClient
from google.analytics.data_v1alpha.types import DateRange
from google.analytics.data_v1alpha.types import Dimension
from google.analytics.data_v1alpha.types import Entity
from google.analytics.data_v1alpha.types import Metric
from google.analytics.data_v1alpha.types import RunReportRequest, RunRealtimeReportRequest

PROPERTY_ID = "properties/257302691"
default_app = firebase_admin.initialize_app()



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

@staff_member_required(login_url='admin:login', redirect_field_name='next')
def add_pics_view(request):
  form = PicForm
  return render(request, 'main/admin-pics.html', )