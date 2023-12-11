import { styled } from "styled-components";
import OrangeBtn from "../common/OrangeBtn";
import { useState } from "react";
import axios from "axios";

const StyleInput = styled.input`
    width: 320px;
    height:44px;
    background-color: #fcfcfc;
    border: 1px solid #dee2e6;
    padding: 0 12px;
    font-size: 16px;
    &:focus{
        outline:none;
        border-color: #FF7A00;
        opacity: 0.8;
    }
`;
const ModalWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5); /* 블러 효과를 위한 반투명 배경 */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index:1;
`;

const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    min-height: 60vh;
    width: 50vw;
    background-color: white;
    align-items: center;
    border-radius:8px;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 10px; 
    right: 10px;
    height: 10px;
    cursor: pointer;
    font-size: 24px;
    background: none;
    border: none;
    padding: 0;
    margin: 0;
    outline: none;
`;

const StyleSet = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 1vh;
`;

const RequestMatzipCard = ({ onClose }) => {
    const [channelName, setChannelName] = useState('');
    const [restaurantName, setRestuarantName] = useState('');
    const [videoUrl, setVideoUrl] = useState('');

    const onChangeChannelHandler = (e) => setChannelName(e.target.value);
    const onChangeRestuarantHandler = (e) => setRestuarantName(e.target.value);
    const onChangeVideoUrlHandler = (e) => setVideoUrl(e.target.value);

    const onClickRequest = async () => {
        const userId = sessionStorage.getItem("userId");
        let body = {
            userId: userId,
            channelName: channelName,
            restaurantName: restaurantName,
            videoUrl: videoUrl
        };
        if (!channelName || !restaurantName || !videoUrl) {
            alert("요청칸을 모두 채워주세요.");
            return;
        }
        try {
            const response = await axios.post('/requestBoard/requestRestaurant', body);
            switch (response.data) {
                case 0:
                    alert("요청이 등록되었습니다.");
                    onClose();
                    break;
                case 1:
                    alert("유저 아이디 오류입니다.");
                    break;
                case 2:
                    alert("세션이 만료되었습니다. 다시 로그인을 시도하세요");
                    break;
                default:
                    alert("알 수 없는 상태 코드입니다.");
                    break;
            }
        } catch (error) {
            alert('서버 오류입니다. 관리자에게 문의하세요.');
            console.error(error);
            return false;
        };
    }

    return (
        <ModalWrapper>
            <ModalContent>
                <CloseButton onClick={onClose}>x</CloseButton>
                <h4 style={{ marginTop: "3vh", marginBottom: "0.4vh", fontWeight: "900" }}>요청글 쓰기</h4>
                <div style={{ fontSize: "0.8rem", color: "#717171" }}>해당 요청에 대한 업로드는 3~4일 정도 소모되며</div>
                <div style={{ fontSize: "0.8rem", color: "#717171" }}>잘못된 입력일 경우 반려될 수 있습니다.</div>
                <div style={{ marginTop: "2vh", marginBottom: "3vh", height: "1px", width: "95%", backgroundColor: "#BBBBBB" }}> </div>
                <div>
                    <StyleSet>
                        <h3 style={{ backgroundColor: "white", color: "black" }}>채널</h3>
                        <StyleInput value={channelName} onChange={onChangeChannelHandler} placeholder="채널명을 입력해주세요" type="text" />
                    </StyleSet>
                    <StyleSet>
                        <h3 style={{ backgroundColor: "white", color: "black" }}>식당이름</h3>
                        <div style={{ marginLeft: "10px" }}>
                            <StyleInput value={restaurantName} onChange={onChangeRestuarantHandler} placeholder="식당이름을 입력해주세요" type="text" />
                            <div style={{ fontSize: "11px", marginBottom: "1rem", marginTop: "0.1rem", color: "#FF7A00" }}>
                                카카오 지도에서 입력되는 지 확인해주세요!
                            </div>
                        </div>
                    </StyleSet>
                    <StyleSet>
                        <h3 style={{ backgroundColor: "white", color: "black" }}>영상 url</h3>
                        <div>
                            <StyleInput value={videoUrl} onChange={onChangeVideoUrlHandler} placeholder="영상 url을 입력해주세요" type="text" />
                            <div style={{ fontSize: "11px", marginBottom: "1rem", marginTop: "0.1rem", color: "#FF7A00" }}>
                                해당 맛집이 소개된 영상 url을 복사 후 붙여넣어 주세요!
                            </div>
                        </div>
                    </StyleSet>
                </div>
                <OrangeBtn text={"맛집 요청하기"} style={{ boxShadow: 'none', borderRadius: 0, marginTop: "3vh" }}
                    onClick={onClickRequest} />
            </ModalContent>
        </ModalWrapper>
    )
}

export default RequestMatzipCard;