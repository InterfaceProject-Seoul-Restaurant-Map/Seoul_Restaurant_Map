import os

import pandas as pd
import requests

#kakao_map
#######################################
my_map_restapi_key = os.environ.get("KAKAO_RESTAPI_KEY")

#restaurants테이블 생성
#####################
restaurant_category_col_list=['restaurant_name','category']
restaurant_category_df=pd.DataFrame([],columns=restaurant_category_col_list)

#video_id_restaurant_list

def place_to_info(place,my_RESP_API_key):
    url = 'https://dapi.kakao.com/v2/local/search/keyword.json'
    params = {'query': place,'page': 1}
    headers = {"Authorization": "KakaoAK "+my_RESP_API_key}
    try:
        places = requests.get(url, params=params, headers=headers).json()['documents'][0]

        restaurant_category_df_input_list = [place,places['category_name']]
    except:
        restaurant_category_df_input_list = [place,None]
        
    global restaurants_df
    restaurant_category_df_input(restaurant_category_df_input_list)
    
def restaurant_category_df_input(input_list):
    global  restaurant_category_df
    #리스트형식의 여러 개의 원소가 들어가있는 열들은 sql쿼리로 차후 수정
    restaurant_category_df.loc[len(restaurant_category_df)]=input_list

def clear_restaurant_category_df(restaurant_category_col_list):
    global restaurant_category_df 
    restaurant_category_df=pd.DataFrame(columns=restaurant_category_col_list)
    
def split_restaurant_category():
    global restaurant_category_df
    # "category" 열을 " > "를 기준으로 분할하여 새로운 행 생성
    restaurant_category_df['category'] = restaurant_category_df['category'].str.split(' > ')
    restaurant_category_df = restaurant_category_df.explode('category').reset_index(drop=True)
    data={'category_link_id': None, 'restaurant_name':list(restaurant_category_df['restaurant_name']), 'category':list(restaurant_category_df['category'])}
    newdf=pd.DataFrame(data);
    return newdf

## main function
def generate_restaurant_category_df(restaurant_name_list):
    restaurant_category_col_list=['restaurant_name','category']
    clear_restaurant_category_df(restaurant_category_col_list)
    
    place_list=restaurant_name_list
    for i,place in enumerate(place_list):
        place_to_info(place,my_map_restapi_key)
        
    return split_restaurant_category()
    
# def return_restaurant_category_df():
#     return restaurant_category_df