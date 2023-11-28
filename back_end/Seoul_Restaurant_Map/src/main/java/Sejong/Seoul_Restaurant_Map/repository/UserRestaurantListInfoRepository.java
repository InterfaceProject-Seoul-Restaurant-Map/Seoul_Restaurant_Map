package Sejong.Seoul_Restaurant_Map.repository;

import Sejong.Seoul_Restaurant_Map.domain.UserRestaurantListInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRestaurantListInfoRepository extends JpaRepository<UserRestaurantListInfo, Long> {

    UserRestaurantListInfo findByListNickname(String name);
}
