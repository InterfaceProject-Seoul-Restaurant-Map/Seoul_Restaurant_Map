import React, { useState } from 'react';
import styled from 'styled-components';
import MyList from '../listComponent/MyList';
import FriendList from '../listComponent/FriendList';

const SidebarWrapper = styled.div`
    min-width: 400px;
    width: 25%;
    background-color: white;
    display: flex;
    overflow-y: scroll;
    overflow-x: hidden;
    flex-direction: column;
    padding: 20px 40px 40px 40px;

    &::-webkit-scrollbar {
    width: 12px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: black;
    }
    &::-webkit-scrollbar-track {
        background-color: white;
        border: 1px solid black;
    }
`;

const NavigationBar = ({ selectedTab, onTabChange, buttonStyle }) => {
    const handleClick = (tab) => {
        onTabChange(tab);
    };

    return (
        <div>
            <button
                onClick={() => handleClick('myList')}
                style={{ ...buttonStyle, color: selectedTab === 'myList' ? 'black' : '#BBBBBB' }}
            >
                내 리스트
            </button>
            <button
                onClick={() => handleClick('friendList')}
                style={{ ...buttonStyle, color: selectedTab === 'friendList' ? 'black' : '#BBBBBB' }}
            >
                친구 리스트
            </button>
        </div>
    );
};

const ListSidebar = () => {
    const [selectedTab, setSelectedTab] = useState('myList');

    const customButtonStyle = {
        border: 'none',
        backgroundColor: 'white',
        // borderRadius: '5px',
        fontSize: '1.3rem',
        fontWeight: '700',
        marginTop: '0px',
        marginRight: '2vw',
        marginLeft: '0px',
        padding: '8px',
        margin: '4px',
        cursor: 'pointer',
    };

    const handleTabChange = (tab) => {
        setSelectedTab(tab);
    };

    return (
        <SidebarWrapper>
            <NavigationBar selectedTab={selectedTab} onTabChange={handleTabChange} buttonStyle={customButtonStyle} />
            <div style={{ border: 'black 1px solid', width: '100%', marginBottom: '3vh' }}></div>
            {selectedTab === 'myList' ? <MyList /> : null}
            {selectedTab === 'friendList' ? <FriendList /> : null}
        </SidebarWrapper>
    );
};

export default ListSidebar;
