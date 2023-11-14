package Sejong.Seoul_Restaurant_Map.repository;

import Sejong.Seoul_Restaurant_Map.domain.Restaurant_category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RestaurantCategoryRepository extends JpaRepository<Restaurant_category, Long> {

    //List<Restaurant_category> findAllByRestaurant(String restaurant_name);
}
