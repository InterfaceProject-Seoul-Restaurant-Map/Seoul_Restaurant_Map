import { useState } from "react";
import { styled } from "styled-components";
import OrangeTriangle from "../common/OrangeTriangle";
import InvertedOrangeTriangle from "../common/InvertedOrangeTrianlge";
import ListFoodTag from "../common/ListFoodTag";
import CopyListBtn from "../common/CopyListBtn";
import PngSearch from '../../img/Search.png'
import DotToggleImg from "../../img/DotToggle.png"
import { useMarkers } from "../util/MyContext";
import axios from "axios";

const AddBtn = styled.div`
    font-size: 1.1rem;
    font-weight: 900;
    margin-bottom: 10px;
    margin-top: 18px;
    cursor: pointer;
`
const InputContainer = styled.div`
    display: ${props => (props.showinput ? 'flex' : 'none')}; // showInput이 true일 때만 flex로 설정

    input {
        background-image: url(${PngSearch});
        background-position: left center; /* 이미지를 왼쪽 중앙에 배치 */
        background-repeat: no-repeat; /* 이미지 반복 없음 */
        background-size: auto 80%; /* 높이를 80%로 설정, 너비는 자동으로 조절됨 */

        caret-color: #FF7A00;
        flex: 1; // 남은 공간을 모두 차지하도록 설정
        font-size: 15px;
        color: #222222;
        border: none;
        border-bottom: solid black 2px;
        padding-bottom: 5px;
        padding-left: 30px;
        z-index: 5;
        margin-right: 10px; // 버튼과의 간격을 설정
    }
    input:focus {
        outline: none;
    }
    button {
        width: 80px;
        padding: 3px 5px;
        box-sizing: border-box;
    }
`;

const StyledSubmitBtn = styled.div`
    padding:1px 3px;
    border-radius: 8px;
    color: orange;
    font-size: 0.8rem;
    border: orange 1px solid;
    margin-left: 10px;
    width: fit-content;
    display: inline-block;
    align-items: center;
    cursor: pointer;
`;

const SmallOrangeTriangle = () => (
    <span style={{ color: '#FFA500', marginRight: '5px' }}>▼</span>
);

const SmallInvertedOrangeTriangle = () => (
    <span style={{ color: '#FFA500', marginRight: '5px' }}>▲</span>
);

const ToggleListItems = ({ list, friendId }) => {
    const [isListOpen, setIsListOpen] = useState(false);
    const [isCopyInputOpen, setIsCopyInputOpen] = useState(false);
    const [isListCopyOpen, setIsListCopyOpen] = useState(false);
    const [newListName, setNewListName] = useState('');
    const { setMarkers, setMapInfo } = useMarkers();

    const handleListToggle = () => setIsListOpen(!isListOpen);
    const handleListCopyToggle = (e) => { setIsListCopyOpen(!isListCopyOpen); e.stopPropagation(); };
    const handleCopyInput = (e) => {
        setIsCopyInputOpen(!isCopyInputOpen)
        // 클릭 이벤트의 전파 막기
        e.stopPropagation();
    }
    const handleSubmitNewList = async ({ srcListName }) => {
        const userId = sessionStorage.getItem("userId");
        let body = {
            friendId: friendId,
            userId: userId,
            srcListName: srcListName,
            destListName: newListName,
        }
        try {
            const response = await axios.post("/list/copyFriendList", body);
            switch (response.data) {
                case 0:
                    alert("등록 성공");
                    break;
                case 1:
                    alert("친구 아이디가 존재하지 않습니다.");
                    break;
                case 2:
                    alert("원본 리스트가 존재하지 않습니다.");
                    break;
                case 3:
                    alert("사용자 ID가 존재하지 않습니다.");
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
    }
    const OnClickShowToMap = async ({ restaurantName }) => {
        function convertObjectToArray(obj) {
            return [obj];
        }
        try {
            const response = await axios.get("/list/returnListElement", {
                params: {
                    restaurantName: restaurantName,
                }
            });
            console.log(response.data);
            setMarkers(convertObjectToArray(response.data));
            setMapInfo(response.data.latlng);
        } catch (error) {
            alert("Error fetching data:", error.response.data);
        }
    };

    return (
        <div>
            <div>
                <h3 onClick={handleListToggle} style={{ display: 'flex', alignItems: 'center', color: "black", backgroundColor: "white" }}>
                    {isListOpen ? <OrangeTriangle /> : <InvertedOrangeTriangle />}
                    {list.listName}
                    {isListCopyOpen ?
                        <CopyListBtn onClick={(e) => { handleCopyInput(e) }} />
                        : <img src={DotToggleImg} style={{ width: "10%", marginLeft: "20px" }} onClick={(e) => handleListCopyToggle(e)} />
                    }
                </h3>
                {isCopyInputOpen && (
                    <div>
                        <input style={{ paddingLeft: "3px", marginLeft: "25px", width: "200px" }}
                            placeholder="만들고 싶은 리스트 이름을 입력하세요."
                            value={newListName}
                            onChange={(e) => setNewListName(e.target.value)}
                        />
                        <StyledSubmitBtn onClick={() => handleSubmitNewList({ srcListName: list.listName })} >등록</StyledSubmitBtn>
                    </div>
                )}
            </div>

            {isListOpen && (
                <ul style={{ listStyleType: "none" }}>
                    {list.restaurantInfo.map((info, index) => (
                        <li key={index}>
                            <div style={{ marginTop: "1vh", marginBottom: "0.4vh" }}>
                                <span onClick={() => OnClickShowToMap({ restaurantName: info.restaurantName })}
                                    style={{ fontWeight: 700, color: "#FF7A00", fontSize: "1.1rem", cursor: "pointer" }}>
                                    {info.restaurantName}
                                </span>
                            </div>
                            {info.tagList.map((tag, tagIndex) => (
                                // <li key={tagIndex}>{tag}</li>
                                <ListFoodTag key={tagIndex} text={tag} />
                            ))}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

const FriendList = () => {
    const [showInput, setShowInput] = useState(true);
    const [inputValue, setInputValue] = useState('');
    const [friendListData, setFriendListData] = useState([]);

    const onClickAddBtn = () => setShowInput(!showInput);
    const onInputChange = e => setInputValue(e.target.value);

    const onClickSearchFriend = async () => {
        const userId = sessionStorage.getItem("userId");
        try {
            //우선 친구아이디가 존재하는지 확인, 존재하면 친구 리스트 불러오기
            const responseExistId = await axios.get("/list/isExistFriend", {
                params: {
                    friendId: inputValue,
                    userId: userId
                },
            });
            switch (responseExistId.data) {
                case 0:
                    console.log("친구를 찾았습니다!");
                    const responseSearchFriendList = await axios.get("/list/searchFriendList", {
                        params: {
                            friendId: inputValue,
                        },
                    });
                    setFriendListData(responseSearchFriendList.data);
                    break;
                case 1:
                    setFriendListData([]);
                    alert("본인 아이디를 입력했습니다. 다른 아이디를 입력해주세요.");
                    break;
                case 2:
                    setFriendListData([]);
                    alert("아이디가 없습니다. 다시 시도해주세요.");
                    break;
                default:
                    alert("알 수 없는 상태 코드입니다:", responseExistId.data);
                    break;
            }
        } catch (error) {
            console.error("Error:", error.response.data);
            return false;
        }
    };

    return (
        <>
            <AddBtn onClick={onClickAddBtn}>친구 아이디 검색하기</AddBtn>
            <InputContainer showinput={showInput}>
                <input type="text" value={inputValue} onChange={onInputChange} placeholder="친구 아이디를 입력해주세요" />
                <button onClick={onClickSearchFriend}>검색하기</button>
            </InputContainer>
            <div>
                {friendListData.map((list, index) => (
                    <ToggleListItems key={index} list={list} friendId={inputValue} />
                ))}
            </div>
        </>
    );
};

export default FriendList;