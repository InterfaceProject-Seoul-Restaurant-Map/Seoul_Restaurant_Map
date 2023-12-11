import pandas as pd

from modules import constants
from modules.cloudSqlModules import getConnection
from modules.cloudSqlModules import getTable
from modules.cloudSqlModules import inputTable
from modules.cloudSqlModules import stringToQuery
from modules.gbqModules import InputTable
from modules.generateModules import GenerateChannelNamePerPlaylist as gcnpp
from modules.generateModules import GeneratePlaylistsTable as gpt
from modules.generateModules import GenerateRestaurantVideoTable as grvt
from modules.generateModules import GenerateResturantsTable as grt
from modules.generateModules import GenerateVideosTable as gvt


def executeAllInput():
    executeChannelNamePerPlaylistList()

    data = executeVideosInput()

    executeRestaurantVideoInput(0, list(data['video_id_restaurant_list']), list(data['restaurant_in_video_list']))

    restaurant_category_df = executeRestaurantsInput(list(data['restaurant_in_video_list']))

    executeRestaurantCategoryInput(restaurant_category_df)


def executePlaylistsInput():
    channel_name_list = constants.CHANNEL_NAME_LIST
    playlist_name_list = constants.PLAYLISTS_NAME_LIST
    is_video_list = constants.IS_VIDEO_LIST

    playlist_df = gpt.input_table(getConnection.getconn(), channel_name_list, playlist_name_list, is_video_list)
    inputTable.input_table(playlist_df, "playlists", 1)


def executeChannelNamePerPlaylistList():
    query_string = "select * from playlists"
    playlists_df = getTable.get_table(stringToQuery.stringToQuery(query_string))
    channel_name_per_playlist_list = gcnpp.get_channel_name_per_playlist_list(playlists_df)
    data = {"channel_name_per_playlist_list": channel_name_per_playlist_list}
    channel_name_per_playlist_list = pd.DataFrame(data)
    channel_name_per_playlist_list.to_csv(constants.PER_PLAYLIST_ROOT)
    print("ok")



def executeVideosInput():
    query_string = "select * from playlists"
    playlists_df = getTable.get_table(stringToQuery.stringToQuery(query_string))

    # channel id in playlists change to channel names and stack list
    try:
        channel_name_per_playlist_list = pd.read_csv(constants.PER_PLAYLIST_ROOT, index_col=None)
    except FileNotFoundError:
        executeChannelNamePerPlaylistList()
        channel_name_per_playlist_list = pd.read_csv(constants.PER_PLAYLIST_ROOT, index_col=None)
    except Exception as e:
        print(f"An error occurred: {e}")
        return
    channel_name_per_playlist_list = list(channel_name_per_playlist_list[constants.PER_PLAYLIST_COL_NAME])

    playlist_id_list = list(playlists_df['playlist_id'])
    is_video_list = list(playlists_df['is_video'])

    table_name = 'videos'

    start_channel_index = 0
    end_channel_next_index = len(channel_name_per_playlist_list)

    is_test = 0
    for i in range(start_channel_index, end_channel_next_index):
        videos_df = gvt.return_videos_df(channel_name_per_playlist_list[i], playlist_id_list[i], int(is_video_list[i]),
                                         is_test)
        input_df = videos_df
        # 처음 추출 아니면 append 형식으로 빅쿼리에 바로 적재
        print("--" + channel_name_per_playlist_list[i] + "--")
        if (i == 0):  # 첫번째로 등록되는 성시경말고는 다 누적으로 빅쿼리에 넣기
            is_replace = 1
            InputTable.input_table(table_name, input_df, is_replace)
        else:
            is_replace = 0
            InputTable.input_table(table_name, input_df, is_replace)

    data = {'video_id_restaurant_list': gvt.video_id_restaurant_list,
            'restaurant_in_video_list': gvt.restaurant_in_video_list}
    return data


def executeRestaurantVideoInput(start_channel_index, video_id_restaurant_list, restaurant_in_video_list):
    restaurant_video_df = grvt.get_restaurant_video_df(video_id_restaurant_list, restaurant_in_video_list)

    table_name = 'restaurant_video'
    input_df = restaurant_video_df
    if start_channel_index == 0:
        is_replace = 1
    else:
        is_replace = 0
    InputTable.input_table(table_name, input_df, is_replace)


def executeRestaurantsInput(restaurant_in_video_list):
    grt.generate_restaurants_df(restaurant_in_video_list)
    restaurants_df = grt.return_restaurants_df()
    restaurant_category_df = grt.return_restaurant_category_df()
    table_name = 'restaurants'
    InputTable.input_table(table_name, restaurants_df, 0)
    return restaurant_category_df


def executeRestaurantCategoryInput(restaurant_category_df):
    restaurant_category_df['category'] = restaurant_category_df['category'].str.split(' > ')
    restaurant_category_df = restaurant_category_df.explode('category').reset_index(drop=True)
    data = {'link_id': None, 'category': list(restaurant_category_df['category']),
            'restaurant_name': list(restaurant_category_df['restaurant_name'])}
    newdf = pd.DataFrame(data)
    table_name = 'restaurant_category'
    InputTable.input_table(table_name, newdf, 0)
