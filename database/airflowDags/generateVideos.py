from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from oauth2client.tools import argparser

import pandas as pd
import re

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

def generate_and_return_videos_df(playlist_id,last_execution_time):
    videos_col_list=['video_id','playlist_id','video_url','thumb_img','video_title','video_views','date']
    clear_videos_df(videos_col_list)
    generate_videos_df(playlist_id,last_execution_time,is_test=0)
    videos_df['date'] = pd.to_datetime(videos_df['date'])
    videos_df['video_views'].astype(int)
    return videos_df

def generate_videos_df(playlist_id,last_execution_time,is_test=0):
    
    videos_col_list=['video_id','playlist_id','video_url','thumb_img','video_title','video_views','date']
    input_list=[None for k in range(len(videos_col_list))]
    
    uploads_playlist_id = playlist_id

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