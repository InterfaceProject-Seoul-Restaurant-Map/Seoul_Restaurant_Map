package Sejong.Seoul_Restaurant_Map.domain;

import jakarta.persistence.*;
import lombok.NoArgsConstructor;

import java.sql.Array;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@NoArgsConstructor
@Entity
@Table(name = "restaurants")
public class Restaurant {

    @Id@Column(name = "restaurant_name")
    private String restaurant_name;

    @OneToMany(mappedBy = "restaurant", fetch = FetchType.LAZY)
    private List<Restaurant_category> categoryList;


    @OneToMany(mappedBy = "restaurant", fetch = FetchType.LAZY)
    private List<Restaurant_video> videoList;

    private String address;
    @Column(name = "location_x")
    private double locationX;
    @Column(name = "location_y")
    private double locationY;
    private String placeUrl;

    @Override
    public boolean equals(Object o){
        if (o instanceof Restaurant) {
            return restaurant_name.equals(((Restaurant) o).restaurant_name);
        }
        return false;
    }
    @Override
    public int hashCode() {
        return restaurant_name.hashCode();
    }

    public List<Restaurant_video> getVideoList() {
        return videoList;
    }

    public void setVideoList(List<Restaurant_video> videoList) {
        this.videoList = videoList;
    }

    public String getRestaurant_name() {
        return restaurant_name;
    }

    public void setRestaurant_name(String restaurant_name) {
        this.restaurant_name = restaurant_name;
    }

    public List<Restaurant_category> getCategoryList() {
        return categoryList;
    }

    public void setCategoryList(List<Restaurant_category> categoryList) {
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

    public void setLocationX(double location_x) {
        this.locationX = location_x;
    }

    public double getLocationY() {
        return locationY;
    }

    public void setLocationY(double location_y) {
        this.locationY = location_y;
    }

    public String getPlaceUrl() {
        return placeUrl;
    }

    public void setPlaceUrl(String place_url) {
        this.placeUrl = place_url;
    }
}