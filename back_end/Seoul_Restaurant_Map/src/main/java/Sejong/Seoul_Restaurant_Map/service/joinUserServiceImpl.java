package Sejong.Seoul_Restaurant_Map.service;

import Sejong.Seoul_Restaurant_Map.domain.User;
import Sejong.Seoul_Restaurant_Map.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
@RequiredArgsConstructor
public class joinUserServiceImpl{

    private final UserRepository userRepository;


    public boolean isValidId(String id) {
        Optional<User> find = userRepository.findById(id);
        if (find.isEmpty())
            return true;
        return false;
    }

    public boolean isValidEmail(String email) {
        if (!userRepository.existsByUserEmail(email))
            return true;
        return false;
    }

    public boolean isValidNickname(String nickname) {
        if (!userRepository.existsByUserName(nickname))
            return true;
        return false;
    }

    public void joinNewUser(String id, String name, String email, String password) {

        User user = new User();
        user.setUser_id(id);
        user.setUserName(name);
        user.setUserEmail(email);
        user.setUserPassword(password);
        userRepository.save(user);
    }

}
