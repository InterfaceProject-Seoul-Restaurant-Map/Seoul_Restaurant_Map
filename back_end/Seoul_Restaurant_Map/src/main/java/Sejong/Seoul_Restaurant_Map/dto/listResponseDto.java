package Sejong.Seoul_Restaurant_Map.dto;

import Sejong.Seoul_Restaurant_Map.domain.Restaurant;
import Sejong.Seoul_Restaurant_Map.domain.UserRestaurantList;
import Sejong.Seoul_Restaurant_Map.domain.UserRestaurantListInfo;

import java.util.List;
import java.util.stream.Collectors;

public class listResponseDto {
    private String listName;
    private List<listRestaurantDto> restaurantInfo;


    public listResponseDto(UserRestaurantListInfo userList) {
        this.listName = userList.getListNickname();
        List<UserRestaurantList> restaurantLists = userList.getRestaurantList();
        this.restaurantInfo =  restaurantLists.stream().map(o -> new listRestaurantDto(o.getRestaurant())).collect(Collectors.toList());
    }

    public String getListName() {
        return listName;
    }

    public void setListName(String listName) {
        this.listName = listName;
    }

    public List<listRestaurantDto> getRestaurantInfo() {
        return restaurantInfo;
    }

    public void setRestaurantInfo(List<listRestaurantDto> restaurantInfo) {
        this.restaurantInfo = restaurantInfo;
    }
}
