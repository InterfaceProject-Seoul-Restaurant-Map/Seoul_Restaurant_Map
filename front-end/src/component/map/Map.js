import { Map, MarkerClusterer } from "react-kakao-maps-sdk"
import { useEffect, useRef, useState } from 'react';
import { useMarkers } from "../util/MyContext";
import axios from 'axios';
import OrangeBtn from '../common/OrangeBtn';
import '../../css/map.css'
import MapMarkerContainer from "./Markers";


const BasicMap = () => {
    const mapRef = useRef();
    const { markers, setMarkers, mapInfo, setMapInfo } = useMarkers();
    const [triggerEffect, setTriggerEffect] = useState(true);
    const config = {
        headers: {
            "Content-Type": "application/json", // 예시로 Content-Type 헤더를 추가했습니다.
        },
        withCredentials: true,
    };

    //현재 지도 영역 얻어와서, 서버에 보내 지도 내에 marker 찍는 함수
    const GetMapBound = async () => {
        const map = mapRef.current;
        const bounds = map.getBounds(); //지도 현재 영역 얻어온다
        const swLatLng = bounds.getSouthWest(); //남서쪽 좌표
        const neLatLng = bounds.getNorthEast(); //북동쪽 좌표

        let x_start = swLatLng.getLng();
        let x_end = neLatLng.getLng();
        let y_start = swLatLng.getLat();
        let y_end = neLatLng.getLat();

        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/home/search`, {
                params: {
                    x_start: x_start,
                    x_end: x_end,
                    y_start: y_start,
                    y_end: y_end,
                },
                withCredentials: true
            });
            setMarkers(response.data);
            setTriggerEffect(false);
        } catch (error) {
            alert('서버 오류입니다. 관리자에게 문의하세요.');
            console.error(error);
            return false;
        };
    }

    //markers가 바뀌면 지도의 중앙 위치 수정. 단, getMapBound함수가 실행되어 markers가 바뀌었으면 실행하지 않게 triggerEffect로 필터링
    useEffect(() => {
        if (triggerEffect) {
            if (markers.length > 0) {
                const firstMarker = markers[0];
                // setMapInfo({
                //     lat: firstMarker.latlng.lat,
                //     lng: firstMarker.latlng.lng,
                //     level: 5,
                // });
            }
        }
        setTriggerEffect(true);
    }, [markers]);

    return (
        <div className={"mapContainer"} >
            <Map id="map" center={{ lat: mapInfo.lat, lng: mapInfo.lng }}
                style={{ width: "100%", height: "100%", }}
                level={mapInfo.level}
                ref={mapRef}
            >
                {/* <MarkerClusterer //마커들이 지도 상에서 많아지면 마커 대신 마커의 수를 나타냄
                    averageCenter={true} // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
                    minLevel={8} // 클러스터링 할 최소 마커 수
                >
                    {markers.map((marker, index) => (
                        <MapMarkerContainer
                            key={index}
                            marker={marker}
                            index={index}
                        />
                    ))};
                </MarkerClusterer> */}

                {markers.map((marker, index) => (
                    <MapMarkerContainer
                        key={index}
                        marker={marker}
                        index={index}
                    />
                ))};
            </Map>
            {console.log("markers", markers)};
            <div className={"RightDown"}>
                <OrangeBtn onClick={GetMapBound} text="지도 내 검색" />
            </div>
        </div >
    )
}

export default BasicMap;