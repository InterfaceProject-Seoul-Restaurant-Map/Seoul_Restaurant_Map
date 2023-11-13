package Sejong.Seoul_Restaurant_Map.repository;

import Sejong.Seoul_Restaurant_Map.domain.Restaurant;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RestaurantRepository extends JpaRepository<Restaurant, String> {
    Page<Restaurant> findByLocationXBetweenAndLocationYBetween(
            double LocationXStart, double LocationXEnd,
            double LocationYStart, double LocationYEnd,
            Pageable pageble);
}
