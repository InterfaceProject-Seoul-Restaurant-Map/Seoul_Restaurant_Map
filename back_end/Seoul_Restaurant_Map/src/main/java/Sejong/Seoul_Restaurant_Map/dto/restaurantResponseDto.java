package Sejong.Seoul_Restaurant_Map.dto;

import Sejong.Seoul_Restaurant_Map.domain.Restaurant;
import Sejong.Seoul_Restaurant_Map.domain.Restaurant_video;
import Sejong.Seoul_Restaurant_Map.domain.Video;

import java.util.List;
import java.util.stream.Collectors;

public class restaurantResponseDto {

    private String restaurant_name;
    private List<String> categoryList;
    private String address;
    private Latlng latlng;
    private String placeUrl;
    private List<videoDto> videoData;

    public restaurantResponseDto(Restaurant restaurant) {
        this.restaurant_name = restaurant.getRestaurant_name();
        this.address = restaurant.getAddress();
        this.latlng = new Latlng(restaurant.getLocationX(), restaurant.getLocationY());
        this.placeUrl = restaurant.getPlaceUrl();
        this.categoryList = restaurant.getCategoryList().stream().map(r -> r.getCategory().getCategory()).collect(Collectors.toList());
        List<Restaurant_video> connectedRestaurant = restaurant.getVideoList();
        List<Video> connectedVideos = connectedRestaurant.stream()
                .map(o -> o.getVideo()).collect(Collectors.toList());
        this.videoData = connectedVideos.stream().map(o -> new videoDto(o)).collect(Collectors.toList());
        this.videoData = this.videoData.stream().distinct().collect(Collectors.toList());
    }

    public List<videoDto> getVideoData() {
        return videoData;
    }

    public void setVideoData(List<videoDto> videoData) {
        this.videoData = videoData;
    }

    public Latlng getLatlng() {
        return latlng;
    }

    public void setLatlng(Latlng latlng) {
        this.latlng = latlng;
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

    public String getPlaceUrl() {
        return placeUrl;
    }

    public void setPlaceUrl(String placeUrl) {
        this.placeUrl = placeUrl;
    }
}
