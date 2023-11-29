package Sejong.Seoul_Restaurant_Map.controller;

import Sejong.Seoul_Restaurant_Map.dto.requestListResponseDto;
import Sejong.Seoul_Restaurant_Map.service.requestBoardServiceImpl;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Objects;

@RestController
@RequiredArgsConstructor
public class requestBoardController {

    private final requestBoardServiceImpl requestService;

    @GetMapping(value = "/requestBoard/searchRequestList")
    public List<requestListResponseDto> searchRequestList(@RequestParam String userId, HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null && session.getAttribute("loginUser") != null){
            return requestService.searchRequestList(userId);
        }
        else {
            return null;
        }
    }

    @PostMapping(value = "/requestBoard/requestRestaurant")
    public int requestRestaurant(@RequestBody HashMap<String, String> map, HttpServletRequest request)
    {
        HttpSession session = request.getSession(false);
        if (session != null && session.getAttribute("loginUser") != null){
            return requestService.requestRestaurant(map.get("userId"), map.get("channelName"),map.get("restaurantName"),map.get("videoUrl"));
        }
        else {
            return 2;
        }
    }

    @PostMapping(value = "/requestBoard/deleteMyRequestElement")
    public int deleteMyRequestElement(@RequestBody HashMap<String, Object> map, HttpServletRequest request)
    {
        HttpSession session = request.getSession(false);
        if (session != null && session.getAttribute("loginUser") != null){
            String userId = (String)map.get("userId");
            long requestId = (long)(int)map.get("requestId");
            return requestService.deleteMyRequestElement(userId, requestId);
        }
        else {
            return 3;
        }
    }

    @PostMapping(value = "/requestBoard/addComment")
    public int addComment(@RequestBody HashMap<String, Object> map, HttpServletRequest request)
    {
        HttpSession session = request.getSession(false);
        if (session != null && session.getAttribute("loginUser") != null){
            String userId = (String)map.get("userId");
            String comment = (String)map.get("comment");
            long requestId = (long)(int)map.get("requestId");
            return requestService.addComment(userId,requestId,comment);
        }
        else {
            return 3;
        }
    }

    @PostMapping(value = "/requestBoard/updateRequestStatus")
    public int updateRequestStatus(@RequestBody HashMap<String, Object> map, HttpServletRequest request)
    {
        HttpSession session = request.getSession(false);
        if (session != null && session.getAttribute("loginUser") != null){
            String userId = (String)map.get("userId");
            String status = (String)map.get("status");
            long requestId = (long)(int)map.get("requestId");
            return requestService.updateRequestStatus(userId, requestId, status);
        }
        else {
            return 3;
        }
    }
}
