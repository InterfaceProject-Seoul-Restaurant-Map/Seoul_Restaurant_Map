package Sejong.Seoul_Restaurant_Map.domain;

import jakarta.persistence.*;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@Entity
@Table(name = "restaurants")
public class Restaurant {
    @Id
    private String restaurant_name;
    @OneToMany(mappedBy = "restaurant")
    private List<Restaurant_category> categoryList;
    private String address;
    @Column(name = "location_x")
    private double locationX;
    @Column(name = "location_y")
    private double locationY;
    private String placeUrl;

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
