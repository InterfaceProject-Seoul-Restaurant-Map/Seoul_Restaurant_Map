import { styled } from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import PreviousArrowBtn from '../../img/previousArrow.png'
import NextArrowBtn from '../../img/nextArrow.png'
import processImg from '../../img/processImg.png'
import SelectedTag from "../common/SelectedTag";
import AdminCommentGeneralCard from "../admin/AdminCommentGeneralCard";
import DeleteListElementBtn from "../common/DeleteListElementBtn";

const StyledTable = styled.table`
    border-collapse: collapse;
    width: 100%;
`;

const StyledTh = styled.th`
    padding: 8px 0;
    color: #BBBBBB;
    border-bottom: 2px solid black;
    text-align: left;
    &:first-child {width: 10%};
    &:nth-child(2) {width: 60%};
    &:nth-child(3) {width: 15%;}
    &:nth-child(4) {width: 15%;}
`;

const StyledTd = styled.td`
    padding: 2vh 0;
    border-bottom: 1px solid #BBBBBB;
`;
const StyledDecoTd = styled.td`
    padding: 2vh 0;
    border-bottom: 1px solid #BBBBBB;
    cursor: pointer;
    &:hover{
        text-decoration: underline;
        color: #FF7A00;
        text-decoration-color:#FF7A00;
    }
`;

const PaginationContainer = styled.div`
    display: flex;
    align-items: center;
    object-fit: cover;
    justify-content: center;
    margin-top: 5vh;
`;
const PageButton = styled.img`
    height: 2vh;
    cursor: pointer;
    margin: 0 1vw;
`;
const PageNumber = styled.span`
    margin: 0 1vw;
    font-weight: ${(props) => (props.active ? "bold" : "normal")};
    color: ${(props) => (props.active ? "#FF7A00" : "inherit")};
`;
const AnswerTr = styled.tr`
    background-color: #D9D9D9;
`;


const onClickDeleteGeneralNotice = async ({ userId, postId }) => {
    let body = { userId: userId, postId: postId };
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/board/deletePost`, body, { withCredentials: true });
        switch (response.data) {
            case 0:
                alert("삭제가 성공적으로 이루어졌습니다.");
                break;
            case 1:
                alert("postId가 없습니다.");
                break;
            case 2:
                alert("userId가 없습니다.");
                break;
            case 3:
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


const onClickDeleteGeneralRequest = async ({ userId, postId }) => {
    let body = { userId: userId, postId: postId };
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/board/deletePost`, body, { withCredentials: true });
        switch (response.data) {
            case 0:
                alert("삭제가 성공적으로 이루어졌습니다.");
                break;
            case 1:
                alert("postId가 없습니다.");
                break;
            case 2:
                alert("userId가 없습니다.");
                break;
            case 3:
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

const TableRow = ({ requestData, index, noticeData }) => {
    const [isOpen, setIsOpen] = useState(false);
    const isopenHandler = () => setIsOpen(!isOpen);
    const [isNoticeOpen, setIsNoticeOpen] = useState(false);
    const noticeOpenHandler = () => setIsNoticeOpen(!isNoticeOpen);
    const [isModalOpen, setModalOpen] = useState(false);
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);
    const userId = sessionStorage.getItem("userId");

    if (noticeData) {
        // noticeData가 존재하는 경우에 반환할 JSX
        return (
            <>
                <tr>
                    <StyledTd><SelectedTag isSelected={true} text="공지사항" /></StyledTd>
                    <StyledDecoTd onClick={noticeOpenHandler}>{noticeData.title}</StyledDecoTd>
                    <StyledTd>{noticeData.userId}</StyledTd>
                    <StyledTd>{noticeData.uploadDate}
                        {
                            noticeData.deleteAuth ? (
                                <DeleteListElementBtn
                                    onClick={() => onClickDeleteGeneralNotice({ userId: userId, postId: noticeData.postId })}
                                />
                            ) : (
                                null// isMine이 false면 빈 <td> 생성
                            )
                        }
                    </StyledTd>
                </tr>
                {isNoticeOpen && (
                    <AnswerTr>
                        <StyledTd></StyledTd>
                        <StyledTd>{noticeData.body}</StyledTd>
                        <StyledTd></StyledTd>
                        <StyledTd></StyledTd>
                        <StyledTd></StyledTd>
                    </AnswerTr>
                )}
            </>
        );
    } else if (requestData) {
        // noticeData가 존재하지 않는 경우에 반환할 JSX
        return (
            <>
                <tr>
                    <StyledTd style={{ fontWeight: "700" }}>{index + 1}</StyledTd>
                    <StyledDecoTd onClick={isopenHandler}>{requestData.title}</StyledDecoTd>
                    <StyledTd>{requestData.userId}</StyledTd>
                    <StyledTd>
                        {requestData.uploadDate}
                        {
                            requestData.deleteAuth ? (
                                <DeleteListElementBtn
                                    onClick={() => onClickDeleteGeneralRequest({ userId: userId, postId: requestData.postId })}
                                />
                            ) : (
                                null// isMine이 false면 빈 <td> 생성
                            )
                        }
                    </StyledTd>
                    {userId === "admin" ? (
                        <>
                            <img src={processImg} onClick={openModal}
                                style={{ height: "25px", cursor: "pointer", marginTop: "2vh", marginLeft: "1vw" }}
                            />
                            {isModalOpen && <AdminCommentGeneralCard onClose={closeModal} postId={requestData.postId} />}
                        </>
                    ) : (
                        null
                    )}
                </tr>

                {isOpen && (
                    <AnswerTr>
                        <StyledTd></StyledTd>
                        <StyledTd>
                            {requestData.body}
                            {requestData.adminAnswer ? (
                                <>
                                    <br />
                                    <br />
                                    ㄴ{requestData.adminAnswer}
                                </>
                            ) : null}
                        </StyledTd>
                        <StyledTd style={{ color: "#BBBBBB" }}>
                            {requestData.adminAnswer ? (
                                <>운영자  </>
                            ) : <>{requestData.userId} </>}
                        </StyledTd>
                        <StyledTd style={{ color: "#BBBBBB" }}>{requestData.answerDate}</StyledTd>
                    </AnswerTr>
                )}
            </>
        );
    }
};

const ITEMS_PER_PAGE = 5; // 페이지당 보여줄 아이템 수

const GeneralBoard = () => {
    const [nomalQuestionList, setNormalQuestionList] = useState([]);
    const [noticeList, setNoticeList] = useState([]);
    const [totalNum, setTotalNum] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const fetchData = async () => {
        const userId = sessionStorage.getItem("userId");
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/board/searchPost`, {
                params: {
                    userId: userId,
                },
                withCredentials: true,
            });
            setTotalNum(response.data.normal.length);
            setNoticeList(response.data.notice);

            const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
            const endIndex = startIndex + ITEMS_PER_PAGE;
            const currentItems = response.data.normal.slice(startIndex, endIndex);
            setNormalQuestionList(currentItems);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const totalPages = Math.ceil(totalNum / ITEMS_PER_PAGE);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    useEffect(() => {
        fetchData();
    }, [currentPage]);

    useEffect(() => {
        fetchData();
    }, []); // 초기 로딩 시에도 데이터를 가져오도록 변경

    return (
        <>
            <div style={{ marginBottom: "1vh" }}>
                총 <span style={{ color: "#FF7A00" }}>{totalNum}</span>건의 게시물이 있습니다
            </div>
            <StyledTable>
                <thead>
                    <tr>
                        <StyledTh>NO</StyledTh>
                        <StyledTh>제목</StyledTh>
                        <StyledTh>작성자</StyledTh>
                        <StyledTh>등록일</StyledTh>
                    </tr>
                </thead>
                <tbody>
                    {/* noticeList가 존재하는 경우 먼저 렌더링 */}
                    {noticeList.map((noticeData, index) => (
                        <TableRow key={noticeData.id} noticeData={noticeData} index={index} />
                    ))}
                    {nomalQuestionList.map((requestData, index) => (
                        <TableRow key={requestData.id} requestData={requestData} index={totalNum - index - 1} />
                    ))}
                </tbody>
            </StyledTable>

            <PaginationContainer>
                <PageButton
                    src={PreviousArrowBtn}
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                />
                {Array.from({ length: totalPages }, (_, index) => (
                    <PageNumber
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        active={currentPage === index + 1}
                    >
                        {index + 1}
                    </PageNumber>
                ))}
                <PageButton
                    src={NextArrowBtn}
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                />
            </PaginationContainer>
        </>
    );
}

export default GeneralBoard;