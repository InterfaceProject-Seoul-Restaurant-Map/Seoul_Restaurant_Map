package Sejong.Seoul_Restaurant_Map.controller;

import Sejong.Seoul_Restaurant_Map.domain.CreateFormUser;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import Sejong.Seoul_Restaurant_Map.service.joinUserServiceImpl;

import java.util.HashMap;
import java.util.Objects;

@RestController
@RequiredArgsConstructor
public class joinController {
    private final joinUserServiceImpl joinService;

    @PostMapping(value = "/join/validId")
    public boolean isValidId(@RequestBody HashMap<String, String> map) {
        if (!joinService.isValidId(map.get("id")))
            return false;
        return true;
    }
    @PostMapping(value = "/join/validEmail")
    public boolean isValidEmail(@RequestBody HashMap<String, String> map)
    {
        if (!joinService.isValidEmail(map.get("email")))
            return false;
        return true;
    }
    @PostMapping(value = "/join/joinNewUser")
    public void joinNewUser(@RequestBody CreateFormUser createFormUser)
    {
        joinService.joinNewUser(createFormUser.getId(), "No Nickname", createFormUser.getEmail(), createFormUser.getPassword());
    }

}
