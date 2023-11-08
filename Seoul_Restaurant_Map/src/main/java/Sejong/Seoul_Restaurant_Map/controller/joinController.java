package Sejong.Seoul_Restaurant_Map.controller;

import org.springframework.web.bind.annotation.RestController;
import Sejong.Seoul_Restaurant_Map.service.joinUserService;
import Sejong.Seoul_Restaurant_Map.service.joinUserServiceImpl;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
public class joinController {

    private joinUserService joinService = new joinUserServiceImpl();

    @PostMapping(value = "/join")
    public boolean isValidId(@RequestParam("userId")String userId){
        return joinService.isValidId(userId);
    }
    @PostMapping(value = "/join3")
    public boolean isValidName(@RequestParam("userName")String userName){
        return joinService.isValidNickname(userName);
    }
    @PostMapping(value = "/join2")
    public boolean isValidEmail(@RequestParam("userEmail")String userEmail){
        return joinService.isValidEmail(userEmail);
    }

}
