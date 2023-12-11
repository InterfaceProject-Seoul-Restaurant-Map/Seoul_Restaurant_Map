import os

import pandas as pd
import requests

#kakao_map
#######################################
my_map_restapi_key = os.environ.get("KAKAO_RESTAPI_KEY")

#restaurants테이블 생성
#####################
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
    
    
##
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