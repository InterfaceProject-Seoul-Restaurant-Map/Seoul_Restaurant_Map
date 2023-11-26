package Sejong.Seoul_Restaurant_Map.controller;

import Sejong.Seoul_Restaurant_Map.dto.listResponseDto;
import Sejong.Seoul_Restaurant_Map.service.listServiceImpl;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class listController {

    private final listServiceImpl listService;

    @GetMapping(value = "/list/searchMyList")
    public List<listResponseDto> searchMyList(@RequestParam String userId, HttpServletRequest request)
    {
        HttpSession session = request.getSession(false);
        if (session != null && session.getAttribute("loginUser") != null){
            return listService.searchMyList(userId);
        }
        else {
            return null; // 세션 만료, id없음 등등 실패 조건 만들기.
        }
    }
}
