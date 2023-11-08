package Sejong.Seoul_Restaurant_Map.repository;

import Sejong.Seoul_Restaurant_Map.domain.Playlists;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlaylistsRepository extends JpaRepository<Playlists, String> {
}
