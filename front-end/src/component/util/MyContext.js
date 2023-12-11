import { createContext, useContext, useState } from 'react';
import { MarkersInfo } from '../../data/MarkerPositions';

const MapContext = createContext();

export const useMarkers = () => {
    const context = useContext(MapContext);
    if (!context) {
        throw new Error('useMarkers must be used within a MarkersProvider');
    }
    return context;
};

export const MapProvider = ({ children }) => {
    const [markers, setMarkers] = useState([]);
    const [isLogin, setIsLogin] = useState(false);
    const [mapInfo, setMapInfo] = useState({
        lat: 37.549186395087,
        lng: 127.07505567644,
        level: 4
    })
    const value = {
        markers,
        setMarkers,
        mapInfo,
        setMapInfo,
        isLogin,
        setIsLogin,
    };

    return (
        <MapContext.Provider value={value}>
            {children}
        </MapContext.Provider>
    );
};
