package Sejong.Seoul_Restaurant_Map.service;

import Sejong.Seoul_Restaurant_Map.domain.LoginState;
import Sejong.Seoul_Restaurant_Map.domain.User;
import Sejong.Seoul_Restaurant_Map.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class loginServiceImpl{

    private final UserRepository userRepository;

    public User findUserById(String id){
        Optional<User> find = userRepository.findById(id);
        return find.get();
    }

    public LoginState checkError(String id, String password) {
        Optional<User> find = userRepository.findById(id);

        if (find.isEmpty())
            return LoginState.ID_ERROR;

        User user = find.get();
        if (user.getUserPassword().equals(password))
            return LoginState.NO_ERROR;

        return LoginState.PASSWORD_ERROR;
    }
}
