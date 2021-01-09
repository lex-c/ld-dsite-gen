from google.analytics.data import AlphaAnalyticsDataClient
from google.analytics.data_v1alpha.types import DateRange
from google.analytics.data_v1alpha.types import Dimension
from google.analytics.data_v1alpha.types import Entity
from google.analytics.data_v1alpha.types import Metric
from google.analytics.data_v1alpha.types import RunReportRequest, RunRealtimeReportRequest

PROPERTY_ID = "properties/257302691"

def get_ga_data():
  client = AlphaAnalyticsDataClient()
  g_request = RunRealtimeReportRequest(
                            property=PROPERTY_ID,
                            dimensions=[Dimension(name='eventName')],
                            metrics=[Metric(name='eventCount')],
                            limit=-1
                            )
  response = client.run_realtime_report(g_request)
  return response

def clean_ga_data(raw_data, all_pics_names):
    events_count_dict = {  row.dimension_values[0].value.split('*')[0]: row.metric_values[0].value for row in raw_data.rows }
    for event_name in list(events_count_dict.keys()):
        if event_name not in all_pics_names:
            del events_count_dict[event_name]
    return events_count_dict