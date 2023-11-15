package Sejong.Seoul_Restaurant_Map.repository;

import Sejong.Seoul_Restaurant_Map.domain.Category_list;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryListRepository extends JpaRepository<Category_list, String> {
    List<Category_list> findByCategoryIn(List<String> categories);
}
