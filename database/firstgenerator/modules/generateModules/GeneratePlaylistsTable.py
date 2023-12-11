import os

import pandas as pd
from googleapiclient.discovery import build

#youtube
#######################################
my_youtube_1 =os.environ.get('YOUTUBE_API_KEY')
my_youtube_api=my_youtube_1


DEVELOPER_KEY = my_youtube_api
YOUTUBE_API_SERVICE_NAME = "youtube"
YOUTUBE_API_VERSION = "v3"
FREEBASE_SEARCH_URL = "https://www.googleapis.com/freebase/v1/search?%s"

youtube=build(YOUTUBE_API_SERVICE_NAME,YOUTUBE_API_VERSION,developerKey=DEVELOPER_KEY)





def input_table(channel_name_list,playlist_name_list,is_video_list):
    playlists_df_columns=['playlist_id', 'channel_id', 'playlist_name', 'is_video']
    playlists_df=pd.DataFrame([],columns=playlists_df_columns) 
         
    channel_id_list=[]
    
    for channel_name in channel_name_list:
        search_response=youtube.search().list(
            q=channel_name,
            type='channel', #채널만
            part='snippet',
            maxResults=1, #채널 아이디만 뽑아올 것이므로 하나의 결괏값만 요구
        ).execute()
        
        #검색한 채널고유아이디
        channel_id = search_response['items'][0]['snippet']['channelId']
        channel_id_list.append(channel_id)
    idx=0    
    for channel_id in channel_id_list:
        if(is_video_list[idx] == 1):
            playlists = youtube.playlists().list(
                channelId = channel_id,
                part = 'snippet',
                maxResults=50
            ).execute()
            
            playlist_id=''
            for playlist_name in playlist_name_list[idx]:
                playlist_id=''
                for dic in playlists['items']:
                    if(dic['snippet']['title']==playlist_name):
                        playlist_id = dic['id']
                        break;

                #playlist_id를 찾지 못했을 경우
                if(playlist_id == ''):
                    print(playlist_name)
                    print("playlist_id error")
                    continue
            
                input_list =[]
                input_list.append(playlist_id)
                input_list.append(channel_id)
                input_list.append(playlist_name)
                input_list.append(bool(is_video_list[idx]))
                playlists_df.loc[len(playlists_df)] = input_list
        else:
            channel_response = youtube.channels().list(
                part='contentDetails', 
                id=channel_id
            ).execute()
            
            uploads_playlist_id = channel_response['items'][0]['contentDetails']['relatedPlaylists']['uploads'] #최신순으로 단순 추출
            
            input_list=[]
            input_list.append(uploads_playlist_id)
            input_list.append(channel_id)
            input_list.append("shorts")
            input_list.append(False)
            playlists_df.loc[len(playlists_df)] = input_list
        idx+=1

    return playlists_df
        
        