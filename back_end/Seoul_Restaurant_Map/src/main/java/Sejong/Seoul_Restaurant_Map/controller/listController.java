package Sejong.Seoul_Restaurant_Map.controller;

import Sejong.Seoul_Restaurant_Map.dto.listResponseDto;
import Sejong.Seoul_Restaurant_Map.service.listServiceImpl;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
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
            return listService.searchListByUserId(userId);
        }
        else {
            return null; // 세션 만료, id없음 등등 실패 조건 만들기.
        }
    }

    @GetMapping(value = "/list/searchFriendList")
    public List<listResponseDto> searchFriendList(@RequestParam String friendId, HttpServletRequest request)
    {
        HttpSession session = request.getSession(false);
        if (session != null && session.getAttribute("loginUser") != null){
            return listService.searchListByUserId(friendId);
        }
        else {
            return null; // 세션 만료, id없음 등등 실패 조건 만들기.
        }
    }

    @PostMapping(value = "/list/copyFriendList")
    public int copyFriendList(@RequestBody HashMap<String, String> map, HttpServletRequest request)
    {
        HttpSession session = request.getSession(false);
        if (session != null && session.getAttribute("loginUser") != null){
            return listService.copyFriendList(map.get("friendId"), map.get("userId"),map.get("srcListName"),map.get("destListName"));
        }
        else {
            return 4;
        }
    }

    @GetMapping(value = "/list/isExistFriend")
    public int isExistFriend(@RequestParam String friendId, @RequestParam String userId, HttpServletRequest request)
    {
        HttpSession session = request.getSession(false);
        if (session != null && session.getAttribute("loginUser") != null){
            return listService.isExistFriend(friendId, userId);
        }
        else {
            return 2; // 세션 만료, id없음 등등 실패 조건 만들기.
        }
    }

    @PostMapping(value = "/list/createList")
    public int createList(@RequestBody HashMap<String, String> map, HttpServletRequest request)
    {
        HttpSession session = request.getSession(false);
        if (session != null && session.getAttribute("loginUser") != null){
            return listService.createList(map.get("userId"), map.get("listName"));
        }
        else {
            return 2;
        }
    }

    @PostMapping(value = "/list/deleteListElement")
    public int deleteListElement(@RequestBody HashMap<String, String> map, HttpServletRequest request)
    {
        HttpSession session = request.getSession(false);
        if (session != null && session.getAttribute("loginUser") != null){
            return listService.deleteListElement(map.get("restaurantName"), map.get("listName"), map.get("userId"));
        }
        else {
            return 3;
        }
    }

    @PostMapping(value = "/list/deleteList")
    public int deleteList(@RequestBody HashMap<String, String> map, HttpServletRequest request)
    {
        HttpSession session = request.getSession(false);
        if (session != null && session.getAttribute("loginUser") != null){
            return listService.deleteList(map.get("listName"), map.get("userId"));
        }
        else {
            return 3;
        }
    }

}
