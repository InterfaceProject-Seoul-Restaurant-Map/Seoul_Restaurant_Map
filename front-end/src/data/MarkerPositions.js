export const MarkersInfo = [
    {
        restaurant_name: "서울포차",
        latlng: { lat: 37.548893758706, lng: 127.07541602235 },
        categoryList: ['hi', 'bye', 'why'],
        address: "제주도 제주시 어디어디",
        placeUrl: "https://www.kakaocorp.com/ir/wayToCome",
        videoData: [{
            channel: '성시경',
            thumb: "https://i.ytimg.com/vi/3tc3F4M607s/mqdefault.jpg",
            url: "https://www.youtube.com/watch?v=3tc3F4M607s&ab_channel=%EC%84%B1%EC%8B%9C%EA%B2%BDSUNGSIKYUNG",
            view: 900000,
        }, {
            channel: '백종원',
            thumb: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcA2d0Ga-h7C6KQ2tSTrtb_C7zjQxp0uJSag&usqp=CAU",
            url: "https://www.youtube.com/watch?v=3tc3F4M607s&ab_channel=%EC%84%B1%EC%8B%9C%EA%B2%BDSUNGSIKYUNG",
            view: 830000,
        }]

    },
    {
        restaurant_name: "생태연못",
        latlng: { lat: 37.54662892259587, lng: 127.0750929875345 },
        categoryList: ['hi', 'bye', 'why'],
        address: "제주도 제주시 어디어디",
        placeUrl: "https://www.kakaocorp.com/ir/wayToCome",
        videoData: [{
            channel: '성시경',
            thumb: "https://i.ytimg.com/vi/3tc3F4M607s/mqdefault.jpg",
            url: "https://www.youtube.com/watch?v=3tc3F4M607s&ab_channel=%EC%84%B1%EC%8B%9C%EA%B2%BDSUNGSIKYUNG",
            view: 900000,
        }, {
            channel: '백종원',
            thumb: "https://i.ytimg.com/vi/3tc3F4M607s/mqdefault.jpg",
            url: "https://www.youtube.com/watch?v=3tc3F4M607s&ab_channel=%EC%84%B1%EC%8B%9C%EA%B2%BDSUNGSIKYUNG",
            view: 830000,
        }]
    },
    {
        restaurant_name: "텃밭",
        latlng: { lat: 33.450879, lng: 126.56994 },
        categoryList: ['hi', 'bye', 'why'],
        address: "제주도 제주시 어디어디",
        placeUrl: "https://www.kakaocorp.com/ir/wayToCome",
        videoData: [{
            channel: '성시경',
            thumb: "https://i.ytimg.com/vi/3tc3F4M607s/mqdefault.jpg",
            url: "https://www.youtube.com/watch?v=3tc3F4M607s&ab_channel=%EC%84%B1%EC%8B%9C%EA%B2%BDSUNGSIKYUNG",
            view: 900000,
        }, {
            channel: '백종원',
            thumb: "https://i.ytimg.com/vi/3tc3F4M607s/mqdefault.jpg",
            url: "https://www.youtube.com/watch?v=3tc3F4M607s&ab_channel=%EC%84%B1%EC%8B%9C%EA%B2%BDSUNGSIKYUNG",
            view: 830000,
        }]
    },
    {
        restaurant_name: "근린공원",
        latlng: { lat: 33.451393, lng: 126.570738 },
        categoryList: ['hi', 'bye', 'why'],
        address: "제주도 제주시 어디어디",
        placeUrl: "https://www.kakaocorp.com/ir/wayToCome",
        videoData: [{
            channel: '성시경',
            thumb: "https://i.ytimg.com/vi/3tc3F4M607s/mqdefault.jpg",
            url: "https://www.youtube.com/watch?v=3tc3F4M607s&ab_channel=%EC%84%B1%EC%8B%9C%EA%B2%BDSUNGSIKYUNG",
            view: 900000,
        }, {
            channel: '백종원',
            thumb: "https://i.ytimg.com/vi/3tc3F4M607s/mqdefault.jpg",
            url: "https://www.youtube.com/watch?v=3tc3F4M607s&ab_channel=%EC%84%B1%EC%8B%9C%EA%B2%BDSUNGSIKYUNG",
            view: 830000,
        }]

    }
]


{/* {markers.map((marker) => (
                    <MapMarker
                        // key={`${loc.title}-${loc.latlng}`}
                        position={marker.latlng}
                        image={{
                            src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
                            size: { width: 24, height: 35 },
                        }}
                        title={marker.restaurant_name}
                    />
                    // <CustomOverlayMap>
                    // </CustomOverlayMap>
                ))} */}
{/* {markers.map((marker) => (
                    <CustomOverlayMap
                        position={marker.latlng}
                        yAnchor={1}
                    >
                        <div className="customoverlay">
                            <a
                                href="https://map.kakao.com/link/map/11394059"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <span className="title">{marker.restaurant_name}</span>
                            </a>
                        </div>
                    </CustomOverlayMap>
                ))} */}






{/* <div key={index}>
                <MapMarker position={marker.latlng} onClick={() => handleMarkerClick(index)} />
                {markerStates[index] && (
                    <CustomOverlayMap position={marker.latlng}>
                        <div className="wrap">
                            <div className="info">
                                <div className="title">
                                    {marker.restaurant_name}
                                    <div
                                        className="close"
                                        onClick={() => handleMarkerClick(index)}
                                        title="닫기"
                                    ></div>
                                </div>
                                <div className="body">
                                    <div className="img">
                                        <img
                                            src={marker.thumbnail}
                                            width="73"
                                            height="70"
                                            alt="카카오 스페이스닷원"
                                        />
                                    </div>
                                    <div className="desc">
                                        <div className="ellipsis">
                                            {marker.address}
                                        </div>
                                        <div className="jibun ellipsis">
                                            {marker.view / 10000}만 VIEWS
                                        </div>
                                        <div>
                                            <a
                                                href={marker.placeUrl}
                                                target="_blank"
                                                className="link"
                                                rel="noreferrer"
                                            >
                                                주소 바로가기
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CustomOverlayMap>
                )}
            </div> */}