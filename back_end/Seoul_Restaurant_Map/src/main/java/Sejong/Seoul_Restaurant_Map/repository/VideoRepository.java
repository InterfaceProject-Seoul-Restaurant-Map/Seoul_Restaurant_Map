package Sejong.Seoul_Restaurant_Map.repository;

import Sejong.Seoul_Restaurant_Map.domain.Video;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VideoRepository extends JpaRepository<Video, String> {
    List<Video> findTop20ByVideoViewsGreaterThanEqual(int views);
}
