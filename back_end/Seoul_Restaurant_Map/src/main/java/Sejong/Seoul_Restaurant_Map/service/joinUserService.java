package Sejong.Seoul_Restaurant_Map.service;

import org.springframework.stereotype.Service;

@Service
public interface joinUserService {

    boolean isValidId(String id);
    boolean isValidEmail(String email);
    boolean isValidNickname(String nickname);
    void joinNewUser(String id, String name, String email, String password);
}
