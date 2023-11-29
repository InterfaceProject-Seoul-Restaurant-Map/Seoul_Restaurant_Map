package Sejong.Seoul_Restaurant_Map.controller;

import Sejong.Seoul_Restaurant_Map.domain.LoginState;
import Sejong.Seoul_Restaurant_Map.domain.User;
import Sejong.Seoul_Restaurant_Map.service.loginServiceImpl;
import com.mysql.cj.log.Log;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@RestController
@RequiredArgsConstructor
public class loginController {
    private final loginServiceImpl loginService;

    @PostMapping(value = "/login")
    public LoginState loginUser(@RequestBody HashMap<String, String> map, HttpServletRequest request) {

         LoginState check =  loginService.checkError(map.get("id"), map.get("password"));
         if (check == LoginState.NO_ERROR)
         {
            HttpSession session = request.getSession();
            User user = loginService.findUserById(map.get("id"));
            session.setAttribute("loginUser", user);
         }
         return check;
    }

    @PostMapping(value = "/logout")
    public int logoutUser(HttpServletRequest request)
    {
        HttpSession session = request.getSession(false);
        if (session != null && session.getAttribute("loginUser") != null){
            session.invalidate();
            return 0;
        }
        else {
            return 1;
        }
    }

    @GetMapping(value = "/checkLoginStatus")
    public boolean checkLoginStatus(HttpServletRequest request)
    {
        HttpSession session = request.getSession(false);
        if (session != null && session.getAttribute("loginUser") != null){
            return true;
        }
        else {
            return false;
        }
    }
}