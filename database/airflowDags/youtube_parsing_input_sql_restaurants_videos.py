from datetime import datetime, timedelta
from airflow import DAG
from airflow.operators.python_operator import PythonOperator
from airflow.operators.latest_only_operator import LatestOnlyOperator
import pytz

from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from oauth2client.tools import argparser

import pandas as pd
import re

import os
from google.cloud.sql.connector import Connector
import sqlalchemy
import pymysql.cursors
import pandas as pd
import numpy as np

from dotenv import load_dotenv

#cloud sql connection setting
#########################################
load_dotenv()
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = os.getenv("service_account_json_path")

connector = Connector()
def getconn() -> pymysql.connections.Connection:
    conn: pymysql.connections.Connection = connector.connect(
        os.getenv("sql_connect_name"),
        "pymysql",
        user="test",
        password="1234",
        db="mz_map"
    )
    return conn

pool = sqlalchemy.create_engine(
    "mysql+pymysql://",
    creator=getconn,
)

#youtube
#######################################
my_youtube_1 ='AIzaSyDH8Pq7ddkmMJhA0kni5kBEe1UPBy31H70'
my_youtube_2 ='AIzaSyAPLm-070e6WYKq2YN2WIqIzbqqrQkU3N4'
my_youtube_api=my_youtube_1

DEVELOPER_KEY = my_youtube_api
YOUTUBE_API_SERVICE_NAME = "youtube"
YOUTUBE_API_VERSION = "v3"
FREEBASE_SEARCH_URL = "https://www.googleapis.com/freebase/v1/search?%s"

youtube=build(YOUTUBE_API_SERVICE_NAME,YOUTUBE_API_VERSION,developerKey=DEVELOPER_KEY)

videos_col_list=['video_id','playlist_id','video_url','thumb_img','video_title','video_views','date']
videos_df=pd.DataFrame(columns=videos_col_list)

restaurant_in_video_list=[]
video_id_restaurant_list=[]

#videos
########################################################################################################

def generate_and_return_videos_df(playlist_id_list,last_execution_time):
    videos_col_list=['video_id','playlist_id','video_url','thumb_img','video_title','video_views','date']
    clear_videos_df(videos_col_list)
    for playlist_id in playlist_id_list:
        generate_videos_df(playlist_id,last_execution_time,is_test=0)
    videos_df['date'] = pd.to_datetime(videos_df['date'])
    videos_df['video_views'].astype(int)
    return videos_df

def generate_videos_df(playlist_id,last_execution_time,is_test=0):
    
    videos_col_list=['video_id','playlist_id','video_url','thumb_img','video_title','video_views','date']
    input_list=[None for k in range(len(videos_col_list))]
    
    uploads_playlist_id = playlist_id

    playlist_items = []  # 초기화
    
    playlistitems = youtube.playlistItems().list(
        part='snippet', 
        playlistId=uploads_playlist_id, 
        maxResults=1
        )

    tmp_playlist_items=(playlistitems.execute())['items']
    upload_time = tmp_playlist_items[0]['snippet']['publishedAt']
    channel_name = tmp_playlist_items[0]['snippet']['channelTitle']
    
    if(last_execution_time<upload_time):
        playlist_items=(playlistitems.execute())['items']
        
    if(is_test==0 or last_execution_time<upload_time):
        while playlistitems:
            playlistitems = youtube.playlistItems().list_next(
                playlistitems,
                playlistitems.execute()
            )

            if not playlistitems:
                break
            
            tmp_playlist_items=(playlistitems.execute())['items']
            upload_time = tmp_playlist_items[0]['snippet']['publishedAt']

            if(last_execution_time>=upload_time):
                break
            playlist_items+=(playlistitems.execute())['items']
    
    each_extract(playlist_items,channel_name,input_list)

def clear_videos_df(videos_col_list):
    global videos_df  # 함수 내에서 전역 변수 videos_df를 수정하기 위해 global 키워드 사용
    videos_df = pd.DataFrame(columns=videos_col_list)  # 빈 DataFrame으로 초기화

def video_info_input(input_list, video_id):
    input_list[2]=f"https://www.youtube.com/watch?v={video_id}"
    video_infos=youtube.videos().list(
        part='snippet, statistics',
        id=video_id,
        #order='date'
        ).execute()
    input_list[3]=video_infos['items'][0]['snippet']['thumbnails']['medium']['url']
    input_list[4]=video_infos['items'][0]['snippet']['title']
    input_list[5]=int(video_infos['items'][0]['statistics']['viewCount'])
    input_list[0]=video_id
    input_list[6]=video_infos['items'][0]['snippet']['publishedAt'][:10]
    return input_list

def restaurant_list_input(matches,video_id):
    global restaurant_in_video_list
    global video_id_restaurant_list
    
    restaurant_in_video_list.append(matches)
    video_id_restaurant_list.append(video_id)
    
def videos_df_input(input_list):
    global videos_df
    videos_df.loc[len(videos_df)] = input_list
    
def each_extract(playlist_short_items,channel_name,input_list):
    if(channel_name=='성시경 SUNG SI KYUNG'):
        for dic in playlist_short_items:
            video_id = dic['snippet']['resourceId']['videoId']
            pattern = r'\[(.*?)\]'
            matches = re.findall(pattern, dic['snippet']['description']) #괄호안에 있는 상호명 추출
            matches = ''.join(matches) #to string          
            if(matches):
                restaurant_list_input(matches,video_id)
                videos_df_input(video_info_input(input_list, video_id))
                
    elif(channel_name=='쏘야미'):
        for dic in playlist_short_items:
            video_id = dic['snippet']['resourceId']['videoId']            
            pattern = r'#(\w+)'
            matches = re.findall(pattern, dic['snippet']['title']) #괄호안에 있는 상호명 추출
            matches = ''.join(matches) #to string
            if(matches != 'shorts' and matches != ''):
                restaurant_list_input(matches,video_id)
                videos_df_input(video_info_input(input_list, video_id))
    
    elif(channel_name=='지뉼랭가이드'):
         for dic in playlist_short_items:
            video_id = dic['snippet']['resourceId']['videoId']
            pattern = r'• (.+)'
            matches = re.findall(pattern, dic['snippet']['description'])
            matches = [match for match in matches]
            desicion_videos_input=0
            for match in matches:
                match = ''.join(match) #to string
                if(match):
                    desicion_videos_input=1
                    restaurant_list_input(match,video_id)
            if(desicion_videos_input==1):
                videos_df_input(video_info_input(input_list, video_id))
                        
    elif(channel_name=='떡볶퀸 Tteokbokqueen'):
         for dic in playlist_short_items:
            video_id = dic['snippet']['resourceId']['videoId']
            pattern = r'\[(.*?)\]'
            matches = re.findall(pattern, dic['snippet']['description']) #괄호안에 있는 상호명 추출
            matches = [match for match in matches]
            desicion_videos_input=0
            for match in matches:
                desicion_videos_input=1
                restaurant_list_input(match,video_id)
            if(desicion_videos_input==1):
                videos_df_input(video_info_input(input_list, video_id))
    
    elif(channel_name=='정육왕 MeatCreator'):
         for dic in playlist_short_items:
            video_id = dic['snippet']['resourceId']['videoId']
            pattern = r'\"(.*?)\"'
            matches = re.findall(pattern, dic['snippet']['description']) #괄호안에 있는 상호명 추출
            matches = ''.join(matches) #to string            
            if(matches):
                restaurant_list_input(matches,video_id)
                videos_df_input(video_info_input(input_list, video_id))
                
    elif(channel_name=='김사원세끼'):
        for dic in playlist_short_items:
            video_id = dic['snippet']['resourceId']['videoId']
            pattern = re.compile(r'\[식당정보\]\n(.+)')
            matches = re.search(pattern, dic['snippet']['description'])
            text=dic['snippet']['description']
            if(matches):
                matched_text = matches.group(1)  # Get the part of the match after '\n'
                
                if(matched_text[0]>='0' and matched_text[0]<='9'):
                    # [식당정보] 다음의 내용을 추출
                    restaurant_start = text.find("[식당정보]")
                    restaurant_end = text.find("- 취미로 유튜브 하고 있습니다", restaurant_start)

                    if restaurant_start != -1 and restaurant_end != -1:
                        restaurant_info = text[restaurant_start:restaurant_end]
                        
                        # 숫자와 '번. ' 뒤에 오는 문자열을 제외하고 한글 문자열만 추출
                        restaurant_names = re.findall(r'\d+\.\s+(.*?)\n', restaurant_info)
                        
                        # '번. ' 부분을 제거하고 출력
                        for name in restaurant_names:
                            matched_text = re.sub(r'\d+\.\s+', '', name)
                            restaurant_list_input(matched_text,video_id)
                else:
                    restaurant_list_input(matched_text,video_id)
                    
                videos_df_input(video_info_input(input_list, video_id))
        
    elif(channel_name=='회사랑RawFishEater'):
        for dic in playlist_short_items:
            video_id = dic['snippet']['resourceId']['videoId']
            pattern = r"- 식당명 : (.+)"
            matches = re.findall(pattern, dic['snippet']['description'])
            matches = ''.join(matches) #to string 
            if(matches):

                restaurant_list_input(matches,video_id)
                videos_df_input(video_info_input(input_list, video_id))
    
    elif(channel_name=='김짬뽕'):
        for dic in playlist_short_items:
            video_id = dic['snippet']['resourceId']['videoId']
            pattern = r"상호 : (.+)"
            matches = re.findall(pattern, dic['snippet']['description'])
            matches = ''.join(matches) #to string 
            if(matches):

                restaurant_list_input(matches,video_id)
                videos_df_input(video_info_input(input_list, video_id))
    
    elif(channel_name=='조이한끼'):
        for dic in playlist_short_items:
            video_id = dic['snippet']['resourceId']['videoId']
            matches = re.findall(r'I\s(.*?)\sI', dic['snippet']['description'])
            matches = ''.join(matches) #to string 
            if(matches):

                restaurant_list_input(matches,video_id)
                videos_df_input(video_info_input(input_list, video_id))
                
    elif(channel_name=='잡식공룡'):
        for dic in playlist_short_items:
            video_id = dic['snippet']['resourceId']['videoId']
            pattern = r"📍(.+)"
            matches = re.findall(pattern, dic['snippet']['description'])
            matches = ''.join(matches).strip() #to string 
            if(matches):

                restaurant_list_input(matches,video_id)
                videos_df_input(video_info_input(input_list, video_id))
         
    elif(channel_name=='섬마을훈태TV'):
        for dic in playlist_short_items:
            video_id = dic['snippet']['resourceId']['videoId']
            matches = re.findall(r'🔍정보🔍\s*\n\s*상호:(.*?)\s*\n', dic['snippet']['description'])
            matches = ''.join(matches).strip() #to string 
            if(matches):
                matches=matches.strip()

                restaurant_list_input(matches,video_id)
                videos_df_input(video_info_input(input_list, video_id))
    
    elif(channel_name=='맛있겠다 Yummy'):
        for dic in playlist_short_items:
            video_id = dic['snippet']['resourceId']['videoId']
            matches = re.findall(r'#(\S+)', dic['snippet']['description'])
            matches=list(set(matches))
            exclude_substring=['맛있겠다','yummy']
            matches=[s for s in matches if all(excl not in s for excl in exclude_substring)]
            for match in matches:
                match=match.strip()
                restaurant_list_input(match,video_id)
            videos_df_input(video_info_input(input_list, video_id))
    
    elif(channel_name =='먹갱_Mukgang'):
        for dic in playlist_short_items:
            video_id = dic['snippet']['resourceId']['videoId']
            matches = re.search(r'오늘의 식당 : \[([^\]]+)\]', dic['snippet']['description'])
            if(matches):
                matches = matches.group(1)
                restaurant_list_input(matches,video_id)
                videos_df_input(video_info_input(input_list, video_id))

#get,input Table
########################################################################################################

from google.cloud import bigquery
from google.oauth2 import service_account
import pandas as pd

# 서비스 계정 인증 정보가 담긴 JSON 파일 경로
KEY_PATH = "/mnt/c/Users/q5749/youtube_api_practice/database/firstgenerator/mz_map_servoce_account.json"

# Credentials 객체 생성
credentials = service_account.Credentials.from_service_account_file(
    KEY_PATH, scopes=["https://www.googleapis.com/auth/cloud-platform"],
)
# 빅쿼리 클라이언트 객체 생성
client = bigquery.Client(credentials = credentials, project = credentials.project_id)

#BigQuery에 데이터 적재하기
def input_table(table_name,input_df,is_replace):
    project_name = 'summer-pattern-398307'
    dataset_name = 'MZ_map_table'
    destination_table = dataset_name + '.' + table_name
    
    if(is_replace):
        input_df.to_gbq(destination_table,project_name,if_exists='replace',credentials=credentials)
        print('replace ok')
    else:
        input_df.to_gbq(destination_table,project_name,if_exists='append',credentials=credentials)
        print('append ok')
        
# BigQuery에서 테이블 가져오기
def get_table(query):
    df = client.query(query).to_dataframe()
    return df

# cloud sql에서 테이블 가져오기
def get_table_sql(query):
    conn = pool.connect()
    return pd.read_sql_query(query,conn)

# cloud sql로 테이블 append하기
def input_table_sql(input_df, table_name, is_replace):
    if(is_replace==0):
        if_exists_message = 'append'
    else:
        if_exists_message = 'replace'
    input_df.to_sql(name=table_name, con=pool, if_exists=if_exists_message, index=False)

#restaurants
########################################################################################################
import requests

#kakao_map
my_map_restapi_key = 'ef692e63b23382e5f866e76b99b38b40'

#restaurants테이블 생성
restaurants_col_list=['restaurant_name',
                     'address',
                     'location_x',
                     'location_y',
                     'place_url']
restaurants_list=[]
restaurants_df=pd.DataFrame(restaurants_list,columns=restaurants_col_list)

#video_id_restaurant_list
def place_to_info(place,my_RESP_API_key):
    url = 'https://dapi.kakao.com/v2/local/search/keyword.json'
    params = {'query': place,'page': 1}
    headers = {"Authorization": "KakaoAK "+my_RESP_API_key}
    try:
        places = requests.get(url, params=params, headers=headers).json()['documents'][0]
        
        if(int(places['x']) ==0):
            return;
        
        input_list=[place,
                    places['address_name'],
                    float(places['x']),
                    float(places['y']),
                    places['place_url']]
        restaurant_category_df_input_list = [place,places['category_name']]
    except:
        print("error")
        
    global restaurants_df
    restaurants_df.loc[len(restaurants_df)]=input_list
    restaurant_category_df_input(restaurant_category_df_input_list)
    
def restaurant_category_df_input(input_list):
    global  restaurant_category_df
    #리스트형식의 여러 개의 원소가 들어가있는 열들은 sql쿼리로 차후 수정
    restaurant_category_df.loc[len(restaurant_category_df)]=input_list

def clear_restaurants_df(restaurants_col_list):
    global restaurants_df  # 함수 내에서 전역 변수 videos_df를 수정하기 위해 global 키워드 사용
    restaurants_df = pd.DataFrame(columns=restaurants_col_list)  # 빈 DataFrame으로 초기화
    
def clear_restaurant_category_df(restaurant_category_col_list):
    global restaurant_category_df 
    restaurant_category_df=pd.DataFrame(columns=restaurant_category_col_list)
    
def generate_restaurants_df(restaurant_in_video_list):
    restaurants_col_list=['restaurant_name',
                            'address',
                            'location_x',
                            'location_y',
                            'place_url']
    restaurant_category_col_list=['restaurant_name','category']
    clear_restaurants_df(restaurants_col_list)
    clear_restaurant_category_df(restaurant_category_col_list)
    
    place_list=list(set(restaurant_in_video_list))
    for i,place in enumerate(place_list):
        place_to_info(place,my_map_restapi_key)
    
def return_restaurants_df():
    return restaurants_df

def return_restaurant_category_df():
    return restaurant_category_df

#DAG
########################################################################################################

# 한국 시간대 설정
kst = pytz.timezone('Asia/Seoul')

def parse_youtube_after_lastest_time(**context):
    # 현재 실행 시간을 한국 시간대로 변환
    current_execution_time_utc = context['execution_date']
    
    # 이전 실행 시간 계산 및 한국 시간대로 변환
    previous_execution_time_utc = current_execution_time_utc - timedelta(weeks=1)
    previous_execution_time_kst = previous_execution_time_utc.astimezone(kst)
    
    # playlist id list 추출
    get_query ="""
        select playlist_id from playlists;
    """
    playlist_id_list = list(get_table_sql(get_query)['playlist_id'])
    
    
    
    # 추가할 videos 테이블
    append_videos_df=generate_and_return_videos_df(playlist_id_list,str(previous_execution_time_kst))
    print(append_videos_df)
    
    # 추가할 restaurants video 테이블
    data={'link_id': None, 'video_id': video_id_restaurant_list, 'restaurant_name':restaurant_in_video_list}
    append_restaurant_video_df=pd.DataFrame(data)
    print(append_restaurant_video_df)
    
    get_query = """
        select video_id from videos;
    """
    
    origin_videos_df = get_table_sql(get_query)
    duplicate_videos_id_list = set(origin_videos_df['video_id'])&set(video_id_restaurant_list)
    
    ## 중복 video 제거 in restaurant_video
    append_restaurant_video_df = append_restaurant_video_df[~append_restaurant_video_df['video_id'].isin(duplicate_videos_id_list)]
    ## 중복 video 제거 in videos
    append_videos_df = append_videos_df[~append_videos_df['video_id'].isin(duplicate_videos_id_list)]    
    
    # 추가할 restaurants 테이블
    append_restaurants_df=return_restaurants_df()

    # 겹치는 restauarant 데이터 제거
    ## 빅쿼리 restaurants의 restaurant_name 추출
    query = """
        SELECT restaurant_name FROM `summer-pattern-398307.MZ_map_table.restaurants`;
    """
    get_query = """
        select restaurant_name from restaurants;
    """
    
    append_restaurants_df=return_restaurants_df()
  
    restaurant_names_df = client.query(query).to_dataframe()
    restaurant_names_df = get_table_sql(get_query)
    ## restaurant_name 비교 후 제거
    # 중복된 레스토랑 이름 필터링
    duplicate_names = set(append_restaurants_df['restaurant_name']) & set(restaurant_names_df['restaurant_name'])

    # 중복된 레스토랑 제거
    append_restaurants_df = append_restaurants_df[~append_restaurants_df['restaurant_name'].isin(duplicate_names)]

    print(append_restaurants_df)
    
    #restaurant_category 겹치는 데이터 제거 [restaurants와 동일한 방식]
    ## restaurant_name 중복 제거
    append_restaurant_category_df = return_restaurant_category_df();
    append_restaurant_category_df = append_restaurant_category_df[~append_restaurant_category_df['restaurant_name'].isin(duplicate_names)];
    
    print("append_restaurants_df")
    print(append_restaurants_df)
    print("append_restaurants_df_count")
    print(append_restaurants_df.shape[0])
    
    #중복 제거된 테이블(restaurants, videos, restaurant_video, restaurant_category)을 sql에 append
    
    input_table_sql(append_restaurants_df,"restaurants",0)
    input_table_sql(append_restaurant_video_df,"restaurant_video",0)
    input_table_sql(append_videos_df,"videos",0)
    input_table_sql(append_restaurant_category_df,"restaurant_category",0)
    

# DAG 정의
dag = DAG(
    dag_id="youtube_parsing_input_restaurants_videos_dag",
    start_date=datetime(2021, 8, 26),
    schedule_interval=None, 
    catchup=False,
    tags=['example']
)

# LatestOnlyOperator: 최신 실행만을 위한 operator
latest_only = LatestOnlyOperator(
    task_id="latest_only",
    dag=dag,
)

# PythonOperator: 실행 시간 출력 task
parse_youtube = PythonOperator(
    task_id="parse_youtube_after_lastest_time_task",
    python_callable=parse_youtube_after_lastest_time,
    provide_context=True,  # 이 옵션을 사용하여 context를 함수에 전달
    dag=dag,
)

# Task 간의 의존성 설정
latest_only >> parse_youtube
