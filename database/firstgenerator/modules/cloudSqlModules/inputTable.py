import os

from dotenv import load_dotenv
from google.cloud.sql.connector import Connector

load_dotenv()

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = os.getenv("SERVICE_ACCOUNT_JSON_PATH")

connector = Connector()

def input_table(pool,input_df, table_name, is_replace):
    if(is_replace==0):
        if_exists_message = 'append'
    else:
        if_exists_message = 'replace'
    input_df.to_sql(name=table_name, con=pool, if_exists=if_exists_message, index=False)
    print("ok")