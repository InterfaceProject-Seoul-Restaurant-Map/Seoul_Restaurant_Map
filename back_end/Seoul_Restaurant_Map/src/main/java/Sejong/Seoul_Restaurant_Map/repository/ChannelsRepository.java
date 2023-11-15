package Sejong.Seoul_Restaurant_Map.repository;

import Sejong.Seoul_Restaurant_Map.domain.Channels;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChannelsRepository extends JpaRepository<Channels, String> {
    List<Channels> findByChannelNameIn(List<String> channels);
}
