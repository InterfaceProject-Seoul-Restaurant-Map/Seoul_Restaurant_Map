import { styled } from "styled-components";
import OrangeBtn from "../common/OrangeBtn";
import { useState } from "react";
import axios from "axios";

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
    min-height: 50vh;
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


const AdminCommentGeneralCard = ({ onClose, postId }) => {
    const [adminAnswer, setAdminAnswer] = useState('');
    const onChangeAdminCommentHandler = (e) => setAdminAnswer(e.target.value);

    const onClickAdminComment = async ({ postId }) => {
        const userId = sessionStorage.getItem("userId");
        const currentDate = new Date();
        const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
        if (!adminAnswer) {
            alert("요청칸을 채워주세요.");
            return;
        }
        let body = {
            userId: userId,
            postId: postId,
            adminAnswer: adminAnswer,
            answerDate: formattedDate,
        };

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/board/addAdminComment`, body, { withCredentials: true });
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

    return (
        <ModalWrapper>
            <ModalContent>
                <CloseButton onClick={onClose}>x</CloseButton>
                <h4 style={{ marginTop: "3vh", marginBottom: "0.4vh", fontWeight: "900" }}>답변 작성하기</h4>
                <label htmlFor="content"></label>
                <textarea
                    id="content"
                    name="content"
                    style={{ width: "80%", height: "150px", marginBottom: "1rem", padding: "0.5rem", border: "1px solid #BBBBBB" }}
                    placeholder="내용을 입력하세요"
                    onChange={onChangeAdminCommentHandler}
                ></textarea>
                <OrangeBtn text={"확인"} style={{ boxShadow: 'none', borderRadius: 0, marginBottom: "3vh" }}
                    onClick={() => onClickAdminComment({ postId: postId })}
                />
            </ModalContent>
        </ModalWrapper>
    )
}

export default AdminCommentGeneralCard;