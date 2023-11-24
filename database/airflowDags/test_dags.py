from airflow.operators.python import PythonOperator
from datetime import datetime, timedelta
from airflow import DAG
from airflow.decorators import task

@task
def print_hello():
    print("hello!")
    return "hello!"

@task
def print_world():
    print("world!")
    return "world!"

with DAG(
    dag_id ="helloWorld",
    start_date = datetime(2021,8,26),
    schedule_interval=None,
    catchup=False,
    tags = ['example']
) as dag:

    # 이렇게 순서를 정하지 않으면, 동시에 독립적으로 실행
    print_hello() >> print_world()