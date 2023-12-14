import React, { useEffect, } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import HeaderJoinBtn from './HeaderJoinBtn';
import HeaderLoginBtn from './HeaderLoginBtn';
import HeaderLogoutBtn from './HeaderLogoutBtn';
import styled from 'styled-components';
import '../../css/active.css'
import axios from 'axios';
import { useMarkers } from '../util/MyContext';

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
    const { isLogin, setIsLogin } = useMarkers();
    const userId = sessionStorage.getItem("userId");
    const navigate = useNavigate();

    // checkLoginStatus 함수를 호출하여 로그인 상태를 확인
    const checkLoginStatus = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/checkLoginStatus`, { withCredentials: true });
            console.log("checkLoginStatus:", response);
            // 여기서 isLoggedIn 값에 따라 로그인 여부를 확인하고 isLogin 값을 변경
            setIsLogin(response.data);
            console.log('Axios Is logged in:', response.data);
        } catch (error) {
            console.error('Error checking login status:', error);
        }
    };

    // 컴포넌트가 마운트되면 로그인 상태를 확인
    useEffect(() => {
        console.log("header loaded");
        checkLoginStatus();
    }, []); // 빈 의존성 배열을 사용하여 최초 한 번만 실행

    return (
        <HeaderContainer>
            <Logo>Mat Zip</Logo>
            <MenuItem>
                <NavLink className={isNavActive} to="/">
                    지도 홈
                </NavLink>
            </MenuItem>
            <MenuItem>
                {isLogin === false ? (
                    <NavLink className={isNavActive} to="/list"
                        onClick={() => {
                            if (!isLogin) {
                                alert("로그인 후 이용 가능합니다.");
                                setTimeout(() => {
                                    navigate("/login", { replace: true });
                                }, 10);
                            }
                        }}>
                        나의 Mat Zip
                    </NavLink>
                )
                    :
                    (
                        <NavLink className={isNavActive} to="/list">
                            나의 Mat Zip
                        </NavLink>
                    )
                }
            </MenuItem>
            <MenuItem>
                <NavLink className={isNavActive} to="/request"
                    onClick={() => {
                        if (!isLogin) {
                            alert("로그인 후 이용 가능합니다.");
                            setTimeout(() => {
                                navigate("/login", { replace: true });
                            }, 10);
                        }
                    }}>
                    Mat Zip 요청
                </NavLink>
            </MenuItem>
            <MenuItem>
                <NavLink className={isNavActive} to="/question"
                    onClick={() => {
                        if (!isLogin) {
                            alert("로그인 후 이용 가능합니다.");
                            setTimeout(() => {
                                navigate("/login", { replace: true });
                            }, 10);
                        }
                    }}>
                    건의사항
                </NavLink>
            </MenuItem>
            {isLogin === false ? (
                <MyInfoItem>
                    <HeaderLoginBtn />
                    <HeaderJoinBtn />
                </MyInfoItem>
            )
                :
                (
                    <>
                        <span style={{ position: 'absolute', right: '30px' }}>
                            <span style={{ color: '#FF7A00' }}>{userId}</span> 님, 오늘도
                            <span style={{ fontWeight: 'bold' }}> Mat Zip</span>과 좋은 하루 보내세요!
                            <HeaderLogoutBtn />
                        </span>
                    </>
                )
            }
        </HeaderContainer>
    );
};

export default Header;
