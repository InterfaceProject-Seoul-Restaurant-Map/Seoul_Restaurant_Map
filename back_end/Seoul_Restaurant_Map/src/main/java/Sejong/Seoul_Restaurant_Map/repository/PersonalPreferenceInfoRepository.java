package Sejong.Seoul_Restaurant_Map.repository;

import Sejong.Seoul_Restaurant_Map.domain.PersonalPreferenceInfoList;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonalPreferenceInfoRepository extends JpaRepository<PersonalPreferenceInfoList, Long> {
}
