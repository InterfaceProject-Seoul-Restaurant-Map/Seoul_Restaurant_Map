package Sejong.Seoul_Restaurant_Map.dto;

import Sejong.Seoul_Restaurant_Map.domain.UserRestaurantListInfo;

public class findListResponseDto {

    private String listName;
    private Long listId;

    public findListResponseDto(UserRestaurantListInfo userList) {
        this.listName = userList.getListNickname();
        this.listId = userList.getUser_list_id();
    }

    public String getListName() {
        return listName;
    }

    public void setListName(String listName) {
        this.listName = listName;
    }

    public Long getListId() {
        return listId;
    }

    public void setListId(Long listId) {
        this.listId = listId;
    }
}
