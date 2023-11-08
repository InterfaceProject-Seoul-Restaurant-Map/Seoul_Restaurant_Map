package Sejong.Seoul_Restaurant_Map.repository;

import Sejong.Seoul_Restaurant_Map.domain.Restaurant_video;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RestaurantVideoRepository extends JpaRepository<Restaurant_video, Long> {
}
