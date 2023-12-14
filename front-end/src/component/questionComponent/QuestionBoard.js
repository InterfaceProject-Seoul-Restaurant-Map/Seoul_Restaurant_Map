import { useState } from "react";
import GeneralBoard from "./GeneralBoard";
import ChannelBoard from "./ChannelBoard";
import { useNavigate } from "react-router-dom";
import { useMarkers } from "../util/MyContext";
import { styled } from "styled-components";
import OrangeBtn from "../common/OrangeBtn";
import AddGeneralBoardCard from "./AddGeneralBoardCard";
import AddChannelBoardCard from "./AddChannelBoardCard";
import AdminPostGeneralCard from "../admin/AdminPostGeneralCard";
import AdminPostChannelCard from "../admin/AdminPostChannelCard";

const BoardListWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const NavigationBar = ({ selectedTab, onTabChange, buttonStyle }) => {
    const userId = sessionStorage.getItem("userId");
    const handleClick = (tab) => onTabChange(tab);
    const [isModalOpen, setModalOpen] = useState(false);
    const { isLogin, setIsLogin } = useMarkers();
    const navigate = useNavigate();
    const openModal = () => {
        if (!isLogin) {
            alert("로그인 후 이용 가능합니다.");
            setTimeout(() => {
                navigate("/login", { replace: true });
            }, 10);
        }
        else
            setModalOpen(true);
    };
    const closeModal = () => setModalOpen(false);

    return (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
                <button
                    onClick={() => handleClick('generalBoard')}
                    style={{
                        ...buttonStyle,
                        color: selectedTab === 'generalBoard' ? '#FF7A00' : 'black',
                        borderBottom: selectedTab === 'generalBoard' ? '1px solid #FF7A00' : 'none',
                    }}
                >
                    일반 게시판
                </button>
                <button
                    onClick={() => handleClick('channelBoard')}
                    style={{
                        ...buttonStyle,
                        color: selectedTab === 'channelBoard' ? '#FF7A00' : 'black',
                        borderBottom: selectedTab === 'channelBoard' ? '1px solid #FF7A00' : 'none',
                    }}
                >
                    채널 요청 게시판
                </button>
            </div>
            {userId !== "admin" ? (
                <>
                    <OrangeBtn text={"글 작성하기"} style={{ boxShadow: 'none', borderRadius: 0 }} onClick={openModal} />
                    {/* 모달 표시 여부에 따라 컴포넌트를 렌더링 */}
                    {selectedTab === 'generalBoard' && isModalOpen && <AddGeneralBoardCard onClose={closeModal} />}
                    {selectedTab === 'channelBoard' && isModalOpen && <AddChannelBoardCard onClose={closeModal} />}
                </>
            ) : (
                <>
                    {/* {selectedTab === 'generalBoard' ? (
                        <OrangeBtn text={"공지사항 등록하기"} style={{ boxShadow: 'none', borderRadius: 0 }} onClick={openModal} />
                    ) : null} */}
                    <OrangeBtn text={"공지사항 등록하기"} style={{ boxShadow: 'none', borderRadius: 0 }} onClick={openModal} />
                    {isModalOpen && selectedTab === 'generalBoard' && <AdminPostGeneralCard onClose={closeModal} />}
                    {isModalOpen && selectedTab === 'channelBoard' && <AdminPostChannelCard onClose={closeModal} />}
                </>
            )}

        </div>
    );
};
const QuestionBoard = () => {
    const [selectedTab, setSelectedTab] = useState('generalBoard');

    const customButtonStyle = {
        border: 'none',
        backgroundColor: 'white',
        fontSize: '1.3rem',
        fontWeight: '700',
        marginTop: '0px',
        marginRight: '2vw',
        marginLeft: '0px',
        marginBottom: '3vh',
        padding: '8px',
        cursor: 'pointer',
    };

    const handleTabChange = (tab) => {
        setSelectedTab(tab);
    };

    return (
        <BoardListWrapper>
            <div>
                <NavigationBar selectedTab={selectedTab} onTabChange={handleTabChange} buttonStyle={customButtonStyle} />
                {selectedTab === 'generalBoard' ? <GeneralBoard /> : null}
                {selectedTab === 'channelBoard' ? <ChannelBoard /> : null}
            </div>
        </BoardListWrapper>
    );
}

export default QuestionBoard;