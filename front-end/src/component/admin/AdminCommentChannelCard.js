import { styled } from "styled-components";
import OrangeBtn from "../common/OrangeBtn";
import { useState } from "react";
import axios from "axios";
import applyImg from '../../img/applyImg.png'
import rejectImg from '../../img/rejectImg.png'

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
    justify-content: space-between;
    position: relative;
    min-height: 60vh;
    width: 50vw;
    background-color: white;
    align-items: center;
    border-radius:8px;
`;
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
const ImgContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 90%;
`;

const AdminCommentChannelCard = ({ onClose, postId }) => {
    const [processState, setProcessState] = useState("");
    const [processComment, setProcessComment] = useState('');
    const [applyImgShadow, setApplyImgShadow] = useState("");
    const [rejectImgShadow, setRejectImgShadow] = useState("");

    const onChangeProcessCommentHandler = (e) => setProcessComment(e.target.value);

    const onClickAdminComment = async ({ postId }) => {
        const userId = sessionStorage.getItem("userId");
        const currentDate = new Date();
        const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
        if (!processComment) {
            alert("요청칸을 채워주세요.");
            return;
        }
        let body = {
            userId: userId,
            postId: postId,
            adminAnswer: processComment,
            answerDate: formattedDate,
        };

        try {
            const response = await axios.post("channelRequestBoard/addAdminComment", body);
            switch (response.data) {
                case 0:
                    alert("처리 성공");
                    onClose();
                    break;
                case 1:
                    alert("관리자 계정이 아닙니다.");
                    break;
                case 2:
                    alert("관리자 계정이 없습니다.");
                    break;
                case 3:
                    alert("postId가 없습니다.");
                    break;
                case 4:
                    alert("세션이 만료되었습니다.");
                    break;
                default:
                    alert("알 수 없는 상태 코드입니다:", response.data);
                    break;
            }
        } catch (error) {
            alert("Error fetching data:", error.response.data);
        }
    };

    const handleState = async ({ postId }) => {
        const userId = sessionStorage.getItem("userId");
        if (!processComment) {
            alert("요청칸을 채워주세요.");
            return;
        }
        let body = {
            userId: userId,
            postId: postId,
            state: processState,
        };

        try {
            const response = await axios.post("/channelRequestBoard/updateStateByAdmin", body);
            switch (response.data) {
                case 0:
                    alert("처리 성공");
                    onClose();
                    break;
                case 1:
                    alert("관리자 계정이 아닙니다.");
                    break;
                case 2:
                    alert("관리자 계정이 없습니다.");
                    break;
                case 3:
                    alert("postId가 없습니다.");
                    break;
                case 4:
                    alert("세션이 만료되었습니다.");
                    break;
                default:
                    alert("알 수 없는 상태 코드입니다:", response.data);
                    break;
            }
        } catch (error) {
            alert("Error fetching data:", error.response.data);
        }
    };

    const onClickApply = () => {
        setProcessState("승인됨");
        setApplyImgShadow("0 0 10px 5px rgba(0, 0, 0, 0.5)");
        setRejectImgShadow("");
    }

    const onClickReject = () => {
        setProcessState("반려됨");
        setRejectImgShadow("0 0 10px 5px rgba(0, 0, 0, 0.5)");
        setApplyImgShadow("");
    }
    return (
        <ModalWrapper>
            <ModalContent>
                <CloseButton onClick={onClose}>x</CloseButton>
                <h4 style={{ marginTop: "3vh", marginBottom: "0.4vh", fontWeight: "900" }}>처리 상태 관리하기</h4>
                <ImgContainer>
                    <>
                        <img src={applyImg} style={{ width: "20vw", cursor: "pointer", boxShadow: applyImgShadow }}
                            onClick={onClickApply}>
                        </img>
                        <img src={rejectImg} style={{ width: "20vw", cursor: "pointer", boxShadow: rejectImgShadow }}
                            onClick={onClickReject}>
                        </img>
                    </>
                </ImgContainer>
                <StyleInput value={processComment} onChange={onChangeProcessCommentHandler} placeholder="반려 사유 혹은 적용되었습니다를 써주세요" type="text" />
                <OrangeBtn text={"확인"} style={{ boxShadow: 'none', borderRadius: 0, marginBottom: "2vh" }}
                    onClick={() => {
                        onClickAdminComment({ postId: postId });
                        handleState({ postId: postId });
                    }}
                />
            </ModalContent>
        </ModalWrapper>
    )
}

export default AdminCommentChannelCard;