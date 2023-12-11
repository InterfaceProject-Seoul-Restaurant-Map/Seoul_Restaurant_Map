from typing import Final

CHANNEL_NAME_LIST: Final=['성시경 SUNG SI KYUNG','떡볶퀸 Tteokbokqueen','지뉼랭가이드','정육왕 MeatCreator',
                   '김사원세끼','회사랑RawFishEater','김짬뽕','조이한끼','잡식공룡',
                   '섬마을훈태TV','맛있겠다 Yummy','먹보스 쭈엽이','먹갱_Mukgang'
                   ]
PLAYLISTS_NAME_LIST: Final=[['성시경의 먹을텐데'],['떡볶퀸 식당','떡볶이 투어 서울 (In Seoul)'],['서울 3대 맛집','인생 찐 맛집','떡볶이 맛집'],['돼지고기 맛집','양고기 맛집','정육왕 레스토랑 맛집','돈까스 맛집','인생맛집'],
                    ['[서울맛집] 외식인생 10년차의 서울 숨은 맛집 소개'],['서울 편 몰아보기'],'','','',
                    ['섬마을훈태 서울'],['서울(Seoul)'],['먹어주엽'],['💜맛있는 야외먹방💜']
                    ]

#1이면 video, 0이면 shorts
IS_VIDEO_LIST: Final=[1,1,1,1,
               1,1,0,0,0,
               1,1,1,1]

PER_PLAYLIST_ROOT = "./resources/channel_name_per_playlist_list.csv"
PER_PLAYLIST_COL_NAME = 'channel_name_per_playlist_list'