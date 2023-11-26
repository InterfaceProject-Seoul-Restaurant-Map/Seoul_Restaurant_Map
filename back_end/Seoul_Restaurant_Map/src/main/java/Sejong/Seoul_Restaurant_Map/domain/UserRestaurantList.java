package Sejong.Seoul_Restaurant_Map.domain;

import jakarta.persistence.*;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@NoArgsConstructor
@Entity
@Table(name="user_lists")
public class UserRestaurantList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long user_list_link_id;

    @ManyToOne
    @JoinColumn(name = "user_list_id")
    private UserRestaurantListInfo info;

    @ManyToOne
    @JoinColumn(name = "restaurant_name")
    private Restaurant restaurant;

    private String restaurant_description;

    private int rank;

    @DateTimeFormat
    private Date upload_in_list_date;

    public Long getUser_list_link_id() {
        return user_list_link_id;
    }

    public void setUser_list_link_id(Long user_list_link_id) {
        this.user_list_link_id = user_list_link_id;
    }

    public UserRestaurantListInfo getInfo() {
        return info;
    }

    public void setInfo(UserRestaurantListInfo info) {
        this.info = info;
    }

    public Restaurant getRestaurant() {
        return restaurant;
    }

    public void setRestaurant(Restaurant restaurant) {
        this.restaurant = restaurant;
    }

    public String getRestaurant_description() {
        return restaurant_description;
    }

    public void setRestaurant_description(String restaurant_description) {
        this.restaurant_description = restaurant_description;
    }

    public int getRank() {
        return rank;
    }

    public void setRank(int rank) {
        this.rank = rank;
    }

    public Date getUpload_in_list_date() {
        return upload_in_list_date;
    }

    public void setUpload_in_list_date(Date upload_in_list_date) {
        this.upload_in_list_date = upload_in_list_date;
    }
}