package Sejong.Seoul_Restaurant_Map.repository;

import Sejong.Seoul_Restaurant_Map.domain.Category_list;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryListRepository extends JpaRepository<Category_list, String> {
}
