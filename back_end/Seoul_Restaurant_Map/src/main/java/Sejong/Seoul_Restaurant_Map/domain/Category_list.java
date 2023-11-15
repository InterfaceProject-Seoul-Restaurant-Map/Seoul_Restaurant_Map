package Sejong.Seoul_Restaurant_Map.domain;

import jakarta.persistence.*;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@Entity
@Table(name = "category_list")
public class Category_list {
    @Id
    private String category;

    @OneToMany(mappedBy = "category", fetch = FetchType.EAGER)
    private List<Restaurant_category> restaurantCategoryList;

    public List<Restaurant_category> getRestaurantCategoryList() {
        return restaurantCategoryList;
    }

    public void setRestaurantCategoryList(List<Restaurant_category> restaurantCategoryList) {
        this.restaurantCategoryList = restaurantCategoryList;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
}
