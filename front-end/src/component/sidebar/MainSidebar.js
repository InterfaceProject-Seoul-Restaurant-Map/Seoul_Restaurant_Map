import React, { useState, useEffect } from 'react';
import { useMarkers } from '../util/MyContext';
import axios from 'axios';
import styled from 'styled-components';
import ChannelWrapper from '../mainComponent/Channel'
import FoodWrapper from '../mainComponent/Food';
import ViewBar from '../mainComponent/ViewBar';
import RegionDropdown from '../mainComponent/Region';
import { OrangeCircle } from '../common/OrangeCircle';
import OrangeBtn from '../common/OrangeBtn';


const SidebarWrapper = styled.div`
    min-width: 400px;
    width: 25%;
    background-color: white;
    display: flex;
    overflow-y: scroll;
    flex-direction: column;
    padding: 40px;
    
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

const StyleTitleWrapper = styled.div`
    margin-bottom: 10px;
    min-height: 2.5vh;
`;

const StyledTitle = styled.span`
    font-size: 18px;
    font-weight: 800;
    color: black;
    margin-right: 10px;
`;

const StyledSubTitle = styled.span`
    font-size: 16px;
    font-weight: 600;
    color: #BBBBBB; 
`;

const StyledTItleContainer = styled.div`
    display: flex;
    justify-content: space-between;
`

const StyledMainTitle = styled.h2`
    margin-top: 0;
    display: inline-block;
`


const MainSidebar = () => {
    const [channelTags, setChannelTags] = useState([]);
    const [foodTags, setFoodTags] = useState([]);
    const [viewValue, setViewValue] = useState();
    const { markers, setMarkers } = useMarkers();
    const config = {
        headers: {
            "Content-Type": "application/json", // 예시로 Content-Type 헤더를 추가했습니다.
        },
    };
    // channel
    const handleTagArrayChange = (newTagArray) => {
        setChannelTags(newTagArray);
    };
    //food
    const handleFoodTagChange = (newTagArray) => {
        setFoodTags(newTagArray);
        console.log("food", newTagArray);
    };
    //view
    const handleViewChange = (value) => {
        setViewValue(value);
    };
    //search
    const onClickSearchHandler = async () => {
        console.log("channel", channelTags, "foodTags", foodTags, "viewValue", viewValue);
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/home/advancedSearch`, {
                params: {
                    channel: channelTags.join(','),
                    tag: foodTags.join(','),
                    views: viewValue,
                },
                withCredentials: true
            });
            setMarkers(response.data);
            console.log(response.data);
        } catch (error) {
            alert('서버 오류입니다. 관리자에게 문의하세요.');
            console.error(error);
            return false;
        }
    };

    return (
        <SidebarWrapper>
            <StyledTItleContainer>
                <StyledMainTitle>나에게 딱 맞는 맛집!</StyledMainTitle>
                <OrangeBtn onClick={onClickSearchHandler} text="검색" />
            </StyledTItleContainer>
            <StyleTitleWrapper> <OrangeCircle /><StyledTitle>CHANNEL</StyledTitle><StyledSubTitle>채널</StyledSubTitle></StyleTitleWrapper>
            <ChannelWrapper onChannelTagsChange={handleTagArrayChange} />
            <StyleTitleWrapper> <OrangeCircle /><StyledTitle>TAG</StyledTitle><StyledSubTitle>태그</StyledSubTitle></StyleTitleWrapper>
            <FoodWrapper onFoodTagsChange={handleFoodTagChange} />
            <StyleTitleWrapper> <OrangeCircle /><StyledTitle>REGION</StyledTitle><StyledSubTitle>지역</StyledSubTitle></StyleTitleWrapper>
            <RegionDropdown />
            <StyleTitleWrapper> <OrangeCircle /><StyledTitle>VIEWS</StyledTitle><StyledSubTitle>조회수</StyledSubTitle></StyleTitleWrapper>
            <ViewBar onViewChange={handleViewChange} />
        </SidebarWrapper>
    );
};

export default MainSidebar;
