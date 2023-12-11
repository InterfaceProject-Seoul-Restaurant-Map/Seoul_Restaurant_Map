package Sejong.Seoul_Restaurant_Map.controller;

import Sejong.Seoul_Restaurant_Map.domain.Board;
import Sejong.Seoul_Restaurant_Map.domain.ChannelRequestBoard;
import Sejong.Seoul_Restaurant_Map.dto.channelRequestBoardResponseDto;
import Sejong.Seoul_Restaurant_Map.service.channelRequestBoardServiceImpl;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequiredArgsConstructor
public class channelRequestBoardController {

    private final channelRequestBoardServiceImpl channelRequestBoardService;

    @PostMapping(value = "/channelRequestBoard/addPost")
    public int addPost(@RequestBody HashMap<String, String> map, HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null && session.getAttribute("loginUser") != null){
            return channelRequestBoardService.addPost(map.get("userId"), new ChannelRequestBoard(map.get("title"), map.get("body"), map.get("uploadDate")));
        }
        else {
            return 2;
        }
    }

    @GetMapping(value = "/channelRequestBoard/searchPost")
    public channelRequestBoardResponseDto searchPost(@RequestParam String userId, HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null && session.getAttribute("loginUser") != null){
            return channelRequestBoardService.searchPost(userId);
        }
        else {
            return null;
        }
    }

    @PostMapping(value = "/channelRequestBoard/deletePost")
    public int deletePost(@RequestBody HashMap<String, Object> map, HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null && session.getAttribute("loginUser") != null){
            String userId = (String)map.get("userId");
            long postId = (long)(int)map.get("postId");
            return channelRequestBoardService.deletePost(userId, postId);
        }
        else {
            return 3;
        }
    }

    @PostMapping(value = "/channelRequestBoard/addAdminComment")
    public int addAdminComment(@RequestBody HashMap<String, Object> map, HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null && session.getAttribute("loginUser") != null){
            String userId = (String)map.get("userId");
            long postId = (long)(int)map.get("postId");
            String answerDate = (String)map.get("answerDate");
            String adminAnswer = (String)map.get("adminAnswer");
            return channelRequestBoardService.addAdminComment(userId, postId, adminAnswer, answerDate);
        }
        else {
            return 4;
        }
    }

    @PostMapping(value = "/channelRequestBoard/addAdminNotice")
    public int addAdminNotice(@RequestBody HashMap<String, String> map , HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null && session.getAttribute("loginUser") != null) {
            return channelRequestBoardService.addAdminNotice(map.get("userId"), map.get("title"), map.get("body"), map.get("uploadDate"));
        }
        else {
            return 3;
        }
    }

    @PostMapping(value = "/channelRequestBoard/updateStateByAdmin")
    public int updateStateByAdmin(@RequestBody HashMap<String, Object> map, HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null && session.getAttribute("loginUser") != null) {
            String userId = (String)map.get("userId");
            Long postId = (long)(int)map.get("postId");
            String state = (String)map.get("state");
            return channelRequestBoardService.updateStateByAdmin(userId, postId, state);
        }
        else {
            return 4;
        }
    }
}
