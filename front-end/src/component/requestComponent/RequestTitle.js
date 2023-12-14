import { useState } from "react";
import OrangeBtn from "../common/OrangeBtn";
import { styled } from "styled-components";
import RequestMatzipCard from "./RequestMatzipCard";
import { useMarkers } from '../util/MyContext';
import { useNavigate } from "react-router-dom";

const InputContainer = styled.div`
    input {
        caret-color: #FF7A00;
        width: 25vw;
        font-size: 1rem;
        color: #FF7A00;
        border: 1px solid black;
        padding-bottom: 5px;
        padding: 8px 10px;
        background: none;
        margin-right: 10px; // 버튼과의 간격을 설정
    }
    input:focus {
        outline: none;
    }
`;

const RequestTitle = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);
    const { isLogin, setIsLogin } = useMarkers();
    const navigate = useNavigate();

    const requestMatzip = () => {
        if (!isLogin) {
            alert("로그인 후 이용 가능합니다.");
            setTimeout(() => {
                navigate("/login", { replace: true });
            }, 10);
        }
        else
            openModal();
    };

    return (
        <div style={{ marginBottom: "5vh" }}>
            <div style={{ marginBottom: "3vh" }}>
                <span style={{ fontSize: "2rem", fontWeight: "700" }} >내가 추천한 채널로</span> <br />
                <span style={{ fontSize: "2rem", fontWeight: "700" }}><span style={{ color: "#FF7A00" }}>Mat Zip</span>에 맛집을</span> <br />
                <span style={{ fontSize: "2rem", fontWeight: "700" }}>더하다!</span> <br />
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                    <h4 style={{ fontWeight: "900", marginBottom: "2px", marginTop: 0 }}>요청 게시판</h4>
                    <span style={{ margin: "1px 0px 60px 1px", color: "#FF7A00", fontSize: "0.8rem", fontWeight: "600" }}>
                        채널 자체 등록 요청은 건의사항 게시판을 이용해주세요.
                    </span>
                </div>
                <InputContainer >
                    <input type="text" placeholder="맛집을 요청해주세요!" />
                    <OrangeBtn text={"맛집 요청하기"} style={{ boxShadow: 'none', borderRadius: 0 }} onClick={requestMatzip} />
                </InputContainer>
                {/* 모달 표시 여부에 따라 컴포넌트를 렌더링 */}
                {isModalOpen && <RequestMatzipCard onClose={closeModal} />}
            </div>
        </div>
    )
}

export default RequestTitle;