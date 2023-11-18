import pandas as pd

def get_restaurant_video_df(video_id_restaurant_list,restaurant_in_video_list):
    data={'link_id': None, 'video_id': video_id_restaurant_list, 'restaurant_name':restaurant_in_video_list}
    restaurant_video_df=pd.DataFrame(data)
    
    return restaurant_video_df;
