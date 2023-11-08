import React from 'react';
import styled from 'styled-components';
import SelectedTag from '../common/SelectedTag';

const SidebarWrapper = styled.div`
    width: 30%;
    background-color: aliceblue;
    display: flex;
    overflow-y: scroll;
    flex-direction: column;
    padding: 20px;
    
    &::-webkit-scrollbar {
    width: 12px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: black;
        height: auto;
    }
    &::-webkit-scrollbar-track {
        background-color: white;
        border: 1px solid black;
    }
`;

// const SidebarContent = styled.div`
//     flex: 1;
//     display: flex;
//     flex-direction: column;
// `;
const divs = [];

for (let i = 0; i < 100; i++) {
    divs.push(<SelectedTag text="seoul" />);
}

const Sidebar = () => {
    return (
        <SidebarWrapper>
            {divs}
        </SidebarWrapper>
    );
};

export default Sidebar;
