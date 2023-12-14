import { useState, useEffect } from "react";
import { styled } from "styled-components";
import axios from "axios";
import OrangeTriangle from "../common/OrangeTriangle";
import InvertedOrangeTriangle from "../common/InvertedOrangeTrianlge";
import ListFoodTag from "../common/ListFoodTag";
import DeleteListBtn from "../common/DeleteListBtn";
import DeleteListElementBtn from "../common/DeleteListElementBtn";
import { useMarkers } from "../util/MyContext";
import DotToggleImg from "../../img/DotToggle.png"


const AddBtn = styled.div`
    font-size: 1.1rem;
    font-weight: 900;
    margin-bottom: 10px;
    margin-top: 18px;
    cursor: pointer;
`

const InputContainer = styled.div`
    display: ${(props) => (props.showinput ? 'flex' : 'none')}; // showInput이 true일 때만 flex로 설정

    input {
        caret-color: #FF7A00;
        flex: 1; // 남은 공간을 모두 차지하도록 설정
        font-size: 15px;
        color: #222222;
        border: none;
        border-bottom: solid black 2px;
        padding-bottom: 5px;
        padding-left: 2px;
        background: none;
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

const H3 = styled.h3`
    display: flex;
    align-items: center;
    color: black;
    background-color: white;
`;


const ToggleList = ({ list, getMyList }) => {
    const [isListOpen, setIsListOpen] = useState(false);
    const [isListDeleteOpen, setIsListDeleteOpen] = useState(false);
    const [isEleDeleteOpen, setIsEleDeleteOpen] = useState(false);
    const { setMarkers, setMapInfo } = useMarkers();
    const config = {
        headers: {
            'Content-Type': 'application/json', // 예시로 Content-Type 헤더를 추가했습니다.
        },
        withCredentials: true,
    };

    const handleToggle = () => { setIsListOpen(!isListOpen) };
    const handleListDelToggle = (e) => { setIsListDeleteOpen(!isListDeleteOpen); e.stopPropagation(); };
    const handleEleDelToggle = (e) => { setIsEleDeleteOpen(!isEleDeleteOpen); e.stopPropagation(); };

    const onClickDeleteList = async ({ listName }) => {
        const userId = sessionStorage.getItem("userId");
        let body = { userId: userId, listName: listName };
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/list/deleteList`, body, config);
            switch (response.data) {
                case 0:
                    console.log("삭제가 성공적으로 이루어졌습니다.");
                    getMyList();
                    break;
                case 1:
                    alert("사용자 ID 오류입니다.");
                    break;
                case 3:
                    alert("세션이 만료되었습니다.");
                    break;
                case 4:
                    alert("리스트 이름 오류입니다.");
                    break;
                default:
                    alert("알 수 없는 상태 코드입니다:", response.data);
                    break;
            }
        } catch (error) {
            alert("Error fetching data:", error.response.data);
        }
    };
    const onClickDeleteListElement = async ({ listName, restaurantName }) => {
        const userId = sessionStorage.getItem("userId");
        let body = { userId: userId, listName: listName, restaurantName: restaurantName };
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/list/deleteListElement`, body, config);
            switch (response.data) {
                case 0:
                    console.log("삭제가 성공적으로 이루어졌습니다.");
                    getMyList();
                    break;
                case 1:
                    alert("사용자 ID 오류입니다.");
                    break;
                case 2:
                    alert("리스트 이름 오류입니다.");
                    break;
                case 3:
                    alert("세션이 만료되었습니다.");
                    break;
                case 4:
                    alert("레스토랑 이름이 유효하지 않습니다.");
                    break;
                default:
                    alert("알 수 없는 상태 코드입니다:", response.data);
                    break;
            }
        } catch (error) {
            alert("Error fetching data:", error.response.data);
        }
    };

    const OnClickShowToMap = async ({ restaurantName }) => {
        function convertObjectToArray(obj) {
            return [obj];
        }
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/list/returnListElement`, {
                params: {
                    restaurantName: restaurantName,
                },
                withCredentials: true
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
            <H3 onClick={handleToggle} >
                {isListOpen ? <OrangeTriangle /> : <InvertedOrangeTriangle />}
                {list.listName}
                {isListDeleteOpen ?
                    <DeleteListBtn onClick={() => onClickDeleteList({ listName: list.listName })} />
                    : <img src={DotToggleImg} style={{ width: "10%", marginLeft: "20px" }} onClick={(e) => handleListDelToggle(e)} />
                }
            </H3>
            {isListOpen && (
                <ul style={{ listStyleType: "none" }}>
                    {list.restaurantInfo.map((info, index) => (
                        <li key={index}>
                            <div style={{ marginTop: "1vh", marginBottom: "0.4vh" }}>
                                <span onClick={() => OnClickShowToMap({ restaurantName: info.restaurantName })}
                                    style={{ fontWeight: 700, color: "#FF7A00", fontSize: "1.1rem", cursor: "pointer" }}>
                                    {info.restaurantName}
                                </span>
                                {isEleDeleteOpen ?
                                    <DeleteListElementBtn onClick={() => onClickDeleteListElement({ listName: list.listName, restaurantName: info.restaurantName })} />
                                    : <img src={DotToggleImg} style={{ width: "10%", marginLeft: "20px" }} onClick={(e) => handleEleDelToggle(e)} />
                                }
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

const MyList = () => {

    const [showInput, setShowInput] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [myListData, setMyListData] = useState([]);
    const onClickAddBtn = () => setShowInput(!showInput);
    const onInputChange = e => setInputValue(e.target.value);

    const config = {
        headers: {
            'Content-Type': 'application/json', // 예시로 Content-Type 헤더를 추가했습니다.
        },
        withCredentials: 'include',
    };

    const onSubmitCreateList = async () => {
        const userId = sessionStorage.getItem("userId");
        if (!inputValue) {
            alert("리스트 이름을 입력해주세요.");
            return;
        }
        let body = { userId: userId, listName: inputValue };
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/list/createList`, body, config);
            const resultCode = response.data; // 서버에서 전달받은 상태 코드
            switch (resultCode) {
                case 0:
                    console.log("성공하였습니다.");
                    setInputValue('');
                    setShowInput(false);
                    getMyList();
                    break;
                case 1:
                    alert("중복된 리스트 이름입니다.");
                    break;
                case 2:
                    alert("세션이 만료되었습니다. 다시 로그인을 시도하세요");
                    break;
                case 3:
                    alert("userId가 없습니다.");
                    break;
                default:
                    alert("알 수 없는 상태 코드입니다.");
                    break;
            }
        } catch (error) {
            console.error("에러 발생:", error.response.data);
            return false;
        }
    };


    const getMyList = async () => {
        const userId = sessionStorage.getItem("userId");
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/list/searchMyList?userId=${userId}`, {
                withCredentials: true,
            });
            if (response.data.length === 0)
                return;
            setMyListData(response.data);
        } catch (error) {
            console.error("Error fetching data:", error.response.data);
        }
    };
    useEffect(() => {
        // MyList 컴포넌트가 처음 렌더링될 때 실행되는 부분
        getMyList();
    }, []);  // 컴포넌트가 처음 렌더링될 때만 실행

    return (
        <>
            <AddBtn onClick={onClickAddBtn}>새로운 리스트 추가하기</AddBtn>
            <InputContainer showinput={showInput ? 1 : 0}>
                <input type="text" value={inputValue} onChange={onInputChange} placeholder="리스트명을 입력해주세요" />
                <button onClick={onSubmitCreateList}>추가하기</button>
            </InputContainer>

            <div>
                {myListData.map((list, index) => (
                    <ToggleList
                        key={index}
                        list={list}
                        getMyList={getMyList}
                    />
                ))}
            </div>
        </>

    );
};

export default MyList;