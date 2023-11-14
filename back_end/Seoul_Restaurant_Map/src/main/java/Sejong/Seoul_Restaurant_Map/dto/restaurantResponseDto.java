package Sejong.Seoul_Restaurant_Map.dto;

import Sejong.Seoul_Restaurant_Map.domain.Restaurant;

import java.util.List;
import java.util.stream.Collectors;



public class restaurantResponseDto {

    private String restaurant_name;
    private List<String> categoryList;
    private String address;
    private double locationX;
    private double locationY;
    private String placeUrl;

    public restaurantResponseDto(Restaurant restaurant) {
        System.out.println("check : " + restaurant.getCategoryList().size());
        this.restaurant_name = restaurant.getRestaurant_name();
        this.address = restaurant.getAddress();
        this.locationX = restaurant.getLocationX();
        this.locationY = restaurant.getLocationY();
        this.placeUrl = restaurant.getPlaceUrl();
        this.categoryList = restaurant.getCategoryList().stream().map(r -> r.getCategory().getCategory()).collect(Collectors.toList());
    }

    public String getRestaurant_name() {
        return restaurant_name;
    }

    public void setRestaurant_name(String restaurant_name) {
        this.restaurant_name = restaurant_name;
    }

    public List<String> getCategoryList() {
        return categoryList;
    }

    public void setCategoryList(List<String> categoryList) {
        this.categoryList = categoryList;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public double getLocationX() {
        return locationX;
    }

    public void setLocationX(double locationX) {
        this.locationX = locationX;
    }

    public double getLocationY() {
        return locationY;
    }

    public void setLocationY(double locationY) {
        this.locationY = locationY;
    }

    public String getPlaceUrl() {
        return placeUrl;
    }

    public void setPlaceUrl(String placeUrl) {
        this.placeUrl = placeUrl;
    }
}
