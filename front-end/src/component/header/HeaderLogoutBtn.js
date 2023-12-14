import styled from "styled-components";
import axios from "axios";
import { useMarkers } from "../util/MyContext";

const StyleLogoutBtn = styled.span`
    margin: 0;
    font-size: 13px;
    font-weight: 800;
    margin-left: 20px;
    color: black;
    text-decoration: none;
    margin-right: 15px;
    cursor: pointer;
`;

const HeaderLogoutBtn = () => {
    const { isLogin, setIsLogin } = useMarkers();
    const onClickLogout = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/logout`, {}, { withCredentials: true });
            console.log("logout respons", response);
            // 여기서 isLoggedIn 값에 따라 로그인 여부를 확인하고 isLogin 값을 변경
            //setIsLogin(response.data);
            //console.log('Axios Is logged in:', response.data);
            if (response.data === 0) {
                setIsLogin(false);
            } else if (response.data === 1) {
                alert("로그아웃 실패");
            }
        } catch (error) {
            console.error('Error checking logout status:', error);
        }
    };
    return (
        <StyleLogoutBtn onClick={onClickLogout}>LOGOUT</StyleLogoutBtn>
    );
};

export default HeaderLogoutBtn;