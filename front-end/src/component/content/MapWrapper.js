import React from 'react';
import styled from 'styled-components';
import BasicMap from '../map/Map';

const MainContentWrapper = styled.div`
    flex: 1;
    background-color: #f0f0f0; 
`;

const MapWrapper = () => {
    return (
        <MainContentWrapper>
            <BasicMap />
        </MainContentWrapper>
    );
};

export default MapWrapper;