import { FoodDatas } from "../../data/FoodType";
import React, { useState, useEffect } from 'react';
import SelectedTag from "../common/SelectedTag";

const FoodTags = ({ onSelectedTagsChange, }) => {
    const [selectedTags, setSelectedTags] = useState({});

    const handleToggleSelection = (tagName) => {
        setSelectedTags((prevSelectedTags) => ({
            ...prevSelectedTags,
            [tagName]: !prevSelectedTags[tagName],
        }));
    };

    useEffect(() => {
        const SelectedFoodsTagArray = Object.keys(selectedTags).filter(tagName => selectedTags[tagName]);
        onSelectedTagsChange(SelectedFoodsTagArray);
    }, [selectedTags]);

    return (
        <div>
            {FoodDatas.map((foodName, index) => (
                <SelectedTag
                    key={index}
                    text={foodName}
                    isSelected={selectedTags[foodName] || false}
                    onClick={() => handleToggleSelection(foodName)}
                />
            ))}
        </div>
    );
};
export default FoodTags;