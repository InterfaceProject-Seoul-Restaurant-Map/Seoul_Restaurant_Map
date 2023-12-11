import React from "react";
import { RegionData } from "../../data/RegionData";
import { useMarkers } from "../util/MyContext";

const SelectBox = (props) => {
    const { markers, setMarkers, mapInfo, setMapInfo } = useMarkers();
    const handleSelectChange = (event) => {
        const selectedValue = event.target.value;

        // 선택된 옵션의 데이터 찾기
        const selectedOption = props.options.find(option => option.value === selectedValue);
        // selectedOption에서 lat 및 lng 변수에 접근
        if (selectedOption && selectedOption.value !== '현재 지도') {
            const { lat, lng, level } = selectedOption;
            setMapInfo({
                lat: lat,
                lng: lng,
                level: level,
            });
        }
    }

    return (
        <select
            style={{ marginBottom: "5vh", fontSize: "1rem" }}
            onChange={handleSelectChange}
        >
            {props.options.map((option) => (
                <option
                    key={option.value}  // Added a key for each option to avoid a React warning
                    value={option.value}
                    defaultValue={props.defaultValue === option.value}
                >
                    {option.name}
                </option>
            ))}
        </select>
    );
};

const RegionDropdown = () => {
    return <SelectBox options={RegionData} defaultValue="현재 지도" />;
};

export default RegionDropdown;
