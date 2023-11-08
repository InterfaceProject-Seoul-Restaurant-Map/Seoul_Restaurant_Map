package Sejong.Seoul_Restaurant_Map.service;

import Sejong.Seoul_Restaurant_Map.domain.LoginState;
import Sejong.Seoul_Restaurant_Map.domain.User;
import Sejong.Seoul_Restaurant_Map.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class loginServiceImpl implements loginService{
    @Autowired
    private UserRepository userRepository;
    @Override
    public LoginState checkError(String id, String password) {
        Optional<User> find = userRepository.findById(id);

        if (find.isEmpty())
            return LoginState.ID_ERROR;

        User user = find.get();
        if (user.getUser_password().equals(password))
            return LoginState.NO_ERROR;

        return LoginState.PASSWORD_ERROR;
    }
}
