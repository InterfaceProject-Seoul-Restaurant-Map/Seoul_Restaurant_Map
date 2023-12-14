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

const AdminPostGeneralCard = ({ onClose }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const onChangeTitleHandler = (e) => setTitle(e.target.value);
    const onChangeContentHandler = (e) => setContent(e.target.value);

    const onClickRequest = async () => {
        const userId = sessionStorage.getItem("userId");
        const currentDate = new Date();
        const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
        let body2 = {
            userId: userId,
            title: title,
            body: content,
            uploadDate: formattedDate,
        };
        if (!title || !content) {
            alert("요청칸을 모두 채워주세요.");
            return;
        }
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/board/addAdminNotice`, body2, { withCredentials: true });
            switch (response.data) {
                case 0:
                    alert("공지사항이 등록되었습니다.");
                    onClose();
                    break;
                case 1:
                    alert("admin 계정이 아닙니다.");
                    break;
                case 2:
                    alert("admin 계정이 없습니다.");
                    break;
                case 3:
                    alert("유효하지 않은 세션입니다.");
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
                <h4 style={{ marginTop: "3vh", marginBottom: "0.4vh", fontWeight: "900" }}>게시판 글쓰기</h4>
                <div style={{ marginTop: "2vh", marginBottom: "3vh", height: "1px", width: "95%", backgroundColor: "#BBBBBB" }}> </div>
                <div>
                    <label htmlFor="title">제목</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        style={{ width: "100%", marginBottom: "1rem", padding: "0.5rem" }}
                        placeholder="제목을 입력하세요"
                        onChange={onChangeTitleHandler}
                    />
                    <label htmlFor="content">본문</label>
                    <textarea
                        id="content"
                        name="content"
                        style={{ width: "100%", height: "150px", marginBottom: "1rem", padding: "0.5rem", border: "1px solid #BBBBBB" }}
                        placeholder="내용을 입력하세요"
                        onChange={onChangeContentHandler}
                    ></textarea>
                </div>
                <OrangeBtn text={"글쓰기 완료"} style={{ boxShadow: 'none', borderRadius: 0, marginTop: "3vh" }}
                    onClick={onClickRequest} />
            </ModalContent>
        </ModalWrapper>
    )
}

export default AdminPostGeneralCard;