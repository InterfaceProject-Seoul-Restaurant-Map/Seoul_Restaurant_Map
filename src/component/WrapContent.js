import React from 'react';
import Sidebar from './sidebar/Sidebar';
import MainContent from './MainContent';
import styled from 'styled-components';

const AppWrapper = styled.div`
    display: flex;
    height: 100vh;
`;

const WrapContent = () => {
    return (
        <AppWrapper>
            <Sidebar />
            <MainContent />
        </AppWrapper>
    );
};

export default WrapContent;
