# from airflow import DAG
# from airflow.operators.python import PythonOperator
# from datetime import datetime, timedelta
# from googleapiclient.discovery import build
# from googleapiclient.errors import HttpError
# from oauth2client.tools import argparser
# import pandas as pd

# my_youtube_1 ='AIzaSyDH8Pq7ddkmMJhA0kni5kBEe1UPBy31H70'
# my_youtube_2 ='AIzaSyAPLm-070e6WYKq2YN2WIqIzbqqrQkU3N4'
# my_youtube_api=my_youtube_1

# DEVELOPER_KEY = my_youtube_api
# YOUTUBE_API_SERVICE_NAME = "youtube"
# YOUTUBE_API_VERSION = "v3"
# FREEBASE_SEARCH_URL = "https://www.googleapis.com/freebase/v1/search?%s"

# youtube=build(YOUTUBE_API_SERVICE_NAME,YOUTUBE_API_VERSION,developerKey=DEVELOPER_KEY)




# def print_channel_id():
#     search_response=youtube.search().list(
#         q="성시경 SUNG SI KYUNG",
#         type='channel', #채널만
#         part='snippet',
#         maxResults=1, #채널 아이디만 뽑아올 것이므로 하나의 결괏값만 요구
#     ).execute()
    
#     channel_id = search_response['items'][0]['snippet']['channelId']
#     print(channel_id)
#     print("성시경")
#     print("성시경")
#     print("성시경")
#     print("성시경")
#     print("성시경")
#     return channel_id;

# with DAG(
#     dag_id ="youtube_api_test_dag",
#     start_date = datetime(2021,8,26),
#     schedule_interval=None,
#     catchup=False,
#     tags = ['example']
# ) as dag:

#     # 이렇게 순서를 정하지 않으면, 동시에 독립적으로 실행
#     print_channel_id()