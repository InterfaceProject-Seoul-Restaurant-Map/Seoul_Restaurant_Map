import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import HeaderJoinBtn from './HeaderJoinBtn';
import HeaderLoginBtn from './HeaderLoginBtn';
import styled from 'styled-components';
import '../../css/active.css'

const HeaderContainer = styled.div`
    margin: 0;
    display: flex;
    padding-top: 10px;
    height: 50px;
    align-items: center;
`;

const Logo = styled.div`
    font-size: 25px;
    font-weight: 600;
    color: #FF7A00;
    margin-left: 20px;
    margin-right: 70px;
`;

const MenuItem = styled.div`
    margin-left: 20px;
    margin-right: 20px;
    font-size: 15px;
    font-weight: bold;
`;

const MyInfoItem = styled.div`
    position: absolute;
    right: 3%;
`;

const isNavActive = ({ isActive }) =>
    (isActive ? "active" : "inactive")
    ;

const Header = () => {
    let [isLogin, setIsLogin] = useState(false);
    // useEffect(() => {
    //     setIsLogin(localStorage.getItem("loginState"));
    // }, [isLogin]);
    console.log(isLogin);
    return (
        <HeaderContainer>
            <Logo>Mat Zip</Logo>
            <MenuItem>
                <NavLink className={isNavActive} to="/" >
                    지도 홈
                </NavLink>
            </MenuItem>
            <MenuItem>
                <NavLink className={isNavActive} to="/list">
                    나의 Mat Zip
                </NavLink>
            </MenuItem>
            <MenuItem>
                <NavLink className={isNavActive} to="/request">
                    Mat Zip 요청
                </NavLink>
            </MenuItem>
            <MenuItem>
                <NavLink className={isNavActive} to="/question">
                    건의사항
                </NavLink>
            </MenuItem>
            {/* <MenuItem>
                <NavLink className={isNavActive} to="/login">
                    로그인
                </NavLink>
            </MenuItem>
            <MenuItem>
                <NavLink className={isNavActive} to="/join">
                    회원가입
                </NavLink>
            </MenuItem> */}
            {isLogin === false ? (
                <MyInfoItem>
                    <HeaderLoginBtn />
                    <HeaderJoinBtn />
                </MyInfoItem>
            )
                :
                (<div>지섭 님, 오늘도 Mat Zip과 좋은하루 보내세요!</div>)
            }

        </HeaderContainer>
    );
};

export default Header;
