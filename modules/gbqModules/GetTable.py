from google.cloud import bigquery
from google.oauth2 import service_account
import pandas as pd

# 서비스 계정 인증 정보가 담긴 JSON 파일 경로
KEY_PATH = "./mz_map_servoce_account.json"
# Credentials 객체 생성
credentials = service_account.Credentials.from_service_account_file(
    KEY_PATH, scopes=["https://www.googleapis.com/auth/cloud-platform"],
)
# 빅쿼리 클라이언트 객체 생성
client = bigquery.Client(credentials = credentials, project = credentials.project_id)

# BigQuery에서 테이블 가져오기
def get_table(query):
    df = client.query(query).to_dataframe()
    return df
