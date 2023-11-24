from datetime import datetime, timedelta
from airflow import DAG
from airflow.operators.python_operator import PythonOperator
from airflow.operators.latest_only_operator import LatestOnlyOperator
import pytz

# 한국 시간대 설정
kst = pytz.timezone('Asia/Seoul')

def external_func():
    return "외부함수 사용가능?"

def print_previous_execution_time(**context):
    # 현재 실행 시간을 한국 시간대로 변환
    current_execution_time_utc = context['execution_date']
    current_execution_time_kst = current_execution_time_utc.astimezone(kst)
    
    # 이전 실행 시간 계산 및 한국 시간대로 변환
    previous_execution_time_utc = current_execution_time_utc - timedelta(minutes=1)
    previous_execution_time_kst = previous_execution_time_utc.astimezone(kst)
    
    # 출력
    print(f"현재 실행 시간 (UTC): {current_execution_time_utc}")
    print(f"현재 실행 시간 (KST): {current_execution_time_kst}")
    print(f"이전 실행 시간 (UTC): {previous_execution_time_utc}")
    print(f"이전 실행 시간 (KST): {previous_execution_time_kst}")
    print(external_func())

# DAG 정의
dag = DAG(
    dag_id="test_lastest_execution_time_dag",
    start_date=datetime(2021, 8, 26),
    schedule_interval=timedelta(minutes=1),  # 매분 실행
    catchup=False,
    tags=['example']
)

# LatestOnlyOperator: 최신 실행만을 위한 operator
latest_only = LatestOnlyOperator(
    task_id="latest_only",
    dag=dag,
)

# PythonOperator: 실행 시간 출력 task
print_execution_time_task = PythonOperator(
    task_id="print_execution_time_task",
    python_callable=print_previous_execution_time,
    provide_context=True,  # 이 옵션을 사용하여 context를 함수에 전달
    dag=dag,
)

# Task 간의 의존성 설정
latest_only >> print_execution_time_task
