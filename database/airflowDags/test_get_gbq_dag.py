from airflow import DAG
from airflow.operators.python import PythonOperator
from datetime import datetime, timedelta
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from oauth2client.tools import argparser

from google.cloud import bigquery
from google.oauth2 import service_account
import pandas as pd

def get_table_test():
    # # 서비스 계정 인증 정보가 담긴 JSON 파일 경로
    # KEY_PATH = "/mnt/c/Users/q5749/youtube_api_practice/database/firstgenerator/mz_map_servoce_account.json"
    # # Credentials 객체 생성
    # print("select restaurant_name from `summer-pattern-")
    # credentials = service_account.Credentials.from_service_account_file(
    #     KEY_PATH, scopes=["https://www.googleapis.com/auth/cloud-platform"],
    # )
    # # 빅쿼리 클라이언트 객체 생성
    # print("select restaurant_name from `summer-pattern-")
    # client = bigquery.Client(credentials = credentials, project = credentials.project_id)
    
    # query = """
    #     SELECT restaurant_name FROM `summer-pattern-398307.MZ_map_table.restaurants`;
    # """
    # print("select restaurant_name from `summer-pattern-")
    # df = client.query(query).to_dataframe()
    # print(df['restaurant_name'])
    # print("restaurant_name 추출 완료")
    # restaurant_name_list=list(df['restaurant_name'])
    # print(restaurant_name_list)
    # print("restaurant_name 리스트 변환 완료")
    print("restaurant_name")

with DAG(
    dag_id ="input_gbq_test_dag",
    start_date = datetime(2021,8,26),
    schedule_interval=None,
    catchup=False,
    tags = ['example']
) as dag:
    
    get_table_test()