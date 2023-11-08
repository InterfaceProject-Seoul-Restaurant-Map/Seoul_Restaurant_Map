package Sejong.Seoul_Restaurant_Map.repository;

import Sejong.Seoul_Restaurant_Map.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, String> {

    @Query("select u from User u where u.user_email = :user_email")
    boolean isValidEmail(@Param("user_email") String user_email);
    @Query("select u from User u where u.user_name = :user_name")
    boolean isValidName(@Param("user_name") String user_name);
}
