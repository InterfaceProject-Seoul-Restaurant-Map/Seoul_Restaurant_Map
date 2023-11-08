import React from 'react';
import styled from 'styled-components';
import Map from './map/Map';

const MainContentWrapper = styled.div`
    flex: 1;
    background-color: #f0f0f0; /* 예시로 배경색 추가 */
`;

const MainContent = () => {
    return (
        <MainContentWrapper>
            <Map />
        </MainContentWrapper>
    );
};

export default MainContent;
