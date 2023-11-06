from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from oauth2client.tools import argparser

import pandas as pd

my_youtube_1 ='AIzaSyDH8Pq7ddkmMJhA0kni5kBEe1UPBy31H70'
my_youtube_2 ='AIzaSyAPLm-070e6WYKq2YN2WIqIzbqqrQkU3N4'
my_youtube_api=my_youtube_2

DEVELOPER_KEY = my_youtube_api
YOUTUBE_API_SERVICE_NAME = "youtube"
YOUTUBE_API_VERSION = "v3"
FREEBASE_SEARCH_URL = "https://www.googleapis.com/freebase/v1/search?%s"

youtube=build(YOUTUBE_API_SERVICE_NAME,YOUTUBE_API_VERSION,developerKey=DEVELOPER_KEY)

def get_channel_name_per_playlist_list(playlists_df):
    channel_name_per_playlist_list = []
    for channel_id in list(playlists_df['channel_id']):    
        search_response=youtube.search().list(
            q=channel_id,
            type='channel', #채널만
            part='snippet',
            maxResults=1, #채널 아이디만 뽑아올 것이므로 하나의 결괏값만 요구
            ).execute()
        
        if(len(search_response['items'])==0):
            playlists = youtube.playlists().list(
                channelId = channel_id,
                part = 'snippet',
                maxResults=1
            ).execute()
            if(len(playlists['items'])==0):
                print("error")
            else:
                channel_name = playlists['items'][0]['snippet']['channelTitle']
        else:
            channel_name = search_response['items'][0]['snippet']['channelTitle']
        
        channel_name_per_playlist_list.append(channel_name)
        
    return channel_name_per_playlist_list;