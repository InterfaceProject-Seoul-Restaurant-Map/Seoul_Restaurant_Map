package Sejong.Seoul_Restaurant_Map.controller;

import Sejong.Seoul_Restaurant_Map.domain.CreateFormUser;
import org.hibernate.mapping.Join;
import org.springframework.web.bind.annotation.*;
import Sejong.Seoul_Restaurant_Map.service.joinUserService;
import Sejong.Seoul_Restaurant_Map.service.joinUserServiceImpl;


@RestController
public class joinController {
    private joinUserService joinService = new joinUserServiceImpl();
    @GetMapping(value = "/join/validId")
    public boolean isValidId(@RequestBody String input_id){
        if (!joinService.isValidId(input_id))
            return false;
        return true;
    }
    @GetMapping(value = "/join/validEmail")
    public boolean isValidEmail(@RequestBody String input_email)
    {
        if (!joinService.isValidEmail(input_email))
            return false;
        return true;
    }
    @PostMapping(value = "/join/joinNewUser")
    public void joinNewUser(@RequestBody CreateFormUser createFormUser)
    {
        joinService.joinNewUser(createFormUser.getId(), "No Nickname", createFormUser.getEmail(), createFormUser.getPassword());
    }

}
