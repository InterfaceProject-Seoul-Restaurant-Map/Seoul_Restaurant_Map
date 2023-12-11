import os
from google.cloud.sql.connector import Connector
import sqlalchemy
import pymysql.cursors
import pandas as pd
import numpy as np

from dotenv import load_dotenv

load_dotenv()

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = os.getenv("SERVICE_ACCOUNT_JSON_PATH")

connector = Connector()
def getconn() -> pymysql.connections.Connection:
    conn: pymysql.connections.Connection = connector.connect(
        os.getenv("SQL_CONNECT_NAME"),
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

def get_table(query):
    conn = pool.connect()
    return pd.read_sql_query(query,conn)