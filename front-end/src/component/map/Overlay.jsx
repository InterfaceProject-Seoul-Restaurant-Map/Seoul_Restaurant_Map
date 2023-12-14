import React, { useState, useEffect } from 'react';
import '../../css/overlay.css'
import PngLeftArrow from '../../img/LeftArrow.png'
import PngRightArrow from '../../img/RightArrow.png'
import ShortcutBtn from '../../img/shortcutBtn.png'
import PlayBtn from '../../img/PlayBtn.png'
import axios from 'axios';
import { useMarkers } from '../util/MyContext';

const Overlay = ({ marker, handleMarkerClick }) => {
    const [curVideoIdx, setCurVideoIdx] = useState(0);
    const [showList, setShowList] = useState(false);
    const [findListData, setFindListData] = useState([]);
    const { isLogin, setIsLogin } = useMarkers();

    // checkLoginStatus 함수를 호출하여 로그인 상태를 확인
    const checkLoginStatus = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/checkLoginStatus`, { withCredentials: true });
            console.log("checkLoginStatus:", response);
            // 여기서 isLoggedIn 값에 따라 로그인 여부를 확인하고 isLogin 값을 변경
            setIsLogin(response.data);
        } catch (error) {
            console.error('Error checking login status:', error);
        }
    };
    // 컴포넌트가 마운트되면 로그인 상태를 확인
    useEffect(() => {
        console.log("overlay loaded");
        checkLoginStatus();
    }, []); // 빈 의존성 배열을 사용하여 최초 한 번만 실행

    const handleNextVideo = () => {
        setCurVideoIdx((prevIdx) => (prevIdx + 1) % marker.videoData.length);
    };
    const handlePrevVideo = () => {
        setCurVideoIdx((prevIdx) => (prevIdx - 1 + marker.videoData.length) % marker.videoData.length);
    }
    const playVideo = () => {
        const videoLink = marker.videoData[curVideoIdx].url;
        window.open(videoLink, '_blank');
    }

    const ToggleList = async ({ }) => {
        const userId = sessionStorage.getItem("userId");
        setShowList(!showList);

        if (isLogin === false) {
            alert("로그인이 필요한 서비스입니다");
            return;
        }
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/home/findList`, {
                params: {
                    userId: userId
                },
                withCredentials: true,
            });
            console.log(response);
            setFindListData(response.data);
        } catch (error) {
            alert("Error fetching data:", error.response.data);
        }
    };

    const handleListItemClick = async (listId, restaurantName) => {
        try {
            const userId = sessionStorage.getItem("userId");
            let body = { userId: userId, listId, listId, restaurantName, restaurantName }
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/home/addRestaurantToList`, body, { withCredentials: true });
            switch (response.data) {
                case 0:
                    alert("리스트에 추가하였습니다.");
                    break;
                case 1:
                    alert("중복된 레스토랑이 이미 리스트에 있습니다.");
                    break;
                case 2:
                    alert("레스토랑 이름이 없습니다.");
                    break;
                case 3:
                    alert("리스트가 유효하지 않습니다.");
                    break;
                case 4:
                    alert("세션이 유효하지 않습니다.");
                    break;
                default:
                    alert("알 수 없는 응답 코드입니다:", response.data);
                // 기타 처리
            }
        } catch (error) {
            console.error("Error handling click:", error);
        }
    };

    return (
        <div className='wrap'>

            <div className='top'
                style={{
                    backgroundImage: `url(${marker.videoData[curVideoIdx].thumb})`,
                    backgroundSize: '100% 100%',
                }}
            >
                <div
                    className="close"
                    onClick={handleMarkerClick}
                    title="닫기"
                >
                </div>

                <h3 style={{ margin: "4px 0px 30px 4px" }}>{marker.videoData[curVideoIdx].channel} |
                    {Math.round(marker.videoData[curVideoIdx].view / 10000 * 10) / 10}만 VIEWS
                </h3>

                {marker.videoData.length === 1 ? (
                    <div className='playBtnContainer'>
                        <img onClick={playVideo} style={{ cursor: "pointer", justifyContent: "center" }} src={PlayBtn} />
                    </div>
                ) :
                    <div className='nextPrevContainer'>
                        <img onClick={handlePrevVideo} src={PngLeftArrow} alt="이전" title='이전' />
                        <img onClick={playVideo} style={{ cursor: "pointer" }} src={PlayBtn} />
                        <img onClick={handleNextVideo} src={PngRightArrow} alt="다음" title='다음' />
                    </div>}


            </div>

            <div className='bottom'>
                <div className='stick'></div>
                <div className='restaurantName'>{marker.restaurant_name}</div>
                <div>
                    <a href={marker.placeUrl} target="_blank" >
                        <img src={ShortcutBtn} />
                    </a>
                </div>
                <span className='plusButton' onClick={ToggleList} >+</span>
                {showList && (
                    <div className='toggle' >
                        {findListData.map((item) => (
                            <div key={item.listId} onClick={() => handleListItemClick(item.listId, marker.restaurant_name)}>{item.listName}</div>
                        ))}
                    </div>
                )}
            </div>
        </div >
    );
};

export default Overlay;