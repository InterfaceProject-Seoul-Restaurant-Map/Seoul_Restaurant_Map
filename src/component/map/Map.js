import React, { useEffect } from 'react';

const { kakao } = window; // kakao maps api를 심어서 가져오면 window전역 객체에 들어가게 됨. window객체에서 kakao를 뽑아야지 카카오 api 에서 사용하는 변수들을 리엑트가 알 수 있다. 


const Map = () => {

    useEffect(() => {
        const container = document.getElementById('myMap');
        const options = {
            center: new kakao.maps.LatLng(33.450701, 126.570667),
            level: 3,

        };
        const map = new kakao.maps.Map(container, options);
    }, []);

    return (
        <div id='myMap' style={{
            width: '100%',
            height: '100%'
        }}></div>
    );
}

export default Map; 