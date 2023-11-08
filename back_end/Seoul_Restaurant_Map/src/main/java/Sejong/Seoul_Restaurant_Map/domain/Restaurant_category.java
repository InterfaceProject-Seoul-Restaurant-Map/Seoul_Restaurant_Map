package Sejong.Seoul_Restaurant_Map.domain;

import jakarta.persistence.*;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Entity
@Table(name = "restaurants_category")
public class Restaurant_category {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long category_link_id;
    @ManyToOne
    @JoinColumn(name = "restaurant_name")
    private Restaurant restaurant;

    @ManyToOne
    @JoinColumn(name = "category")
    private Category_list category;

    public Long getCategory_link_id() {
        return category_link_id;
    }

    public void setCategory_link_id(Long category_link_id) {
        this.category_link_id = category_link_id;
    }

    public Restaurant getRestaurant() {
        return restaurant;
    }

    public void setRestaurant(Restaurant restaurant) {
        this.restaurant = restaurant;
    }

    public Category_list getCategory() {
        return category;
    }

    public void setCategory(Category_list category) {
        this.category = category;
    }
}
