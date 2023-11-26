package Sejong.Seoul_Restaurant_Map.repository;

import Sejong.Seoul_Restaurant_Map.domain.UserRestaurantList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRestaurantListRepository extends JpaRepository<UserRestaurantList, Long> {
}
