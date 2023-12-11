import os

import pymysql.cursors
import sqlalchemy
from dotenv import load_dotenv
from google.cloud.sql.connector import Connector

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

    pool = sqlalchemy.create_engine(
        "mysql+pymysql://",
        creator=conn,
    )
    return pool
