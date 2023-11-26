package Sejong.Seoul_Restaurant_Map.dto;

import Sejong.Seoul_Restaurant_Map.domain.Category_list;
import Sejong.Seoul_Restaurant_Map.domain.Restaurant;
import Sejong.Seoul_Restaurant_Map.domain.Restaurant_category;

import java.util.List;
import java.util.stream.Collectors;


public class listRestaurantDto {
    private String restaurantName;
    private List<String> tagList;

    public listRestaurantDto(Restaurant restaurant) {
        this.restaurantName = restaurant.getRestaurant_name();
        this.tagList = restaurant.getCategoryList().stream().map(r -> r.getCategory().getCategory()).collect(Collectors.toList());
    }

    public String getRestaurantName() {
        return restaurantName;
    }

    public void setRestaurantName(String restaurantName) {
        this.restaurantName = restaurantName;
    }

    public List<String> getTagList() {
        return tagList;
    }

    public void setTagList(List<String> tagList) {
        this.tagList = tagList;
    }
}
