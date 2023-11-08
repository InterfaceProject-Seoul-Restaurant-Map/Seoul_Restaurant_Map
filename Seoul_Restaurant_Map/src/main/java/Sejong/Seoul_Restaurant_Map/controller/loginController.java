package Sejong.Seoul_Restaurant_Map.controller;

import Sejong.Seoul_Restaurant_Map.service.loginService;
import Sejong.Seoul_Restaurant_Map.service.loginServiceImpl;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class loginController {
    private loginService _loginService = new loginServiceImpl();


}
