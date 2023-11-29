package Sejong.Seoul_Restaurant_Map.controller;

import Sejong.Seoul_Restaurant_Map.domain.Board;
import Sejong.Seoul_Restaurant_Map.dto.BoardPostResponseDto;
import Sejong.Seoul_Restaurant_Map.dto.BoardResponseDto;
import Sejong.Seoul_Restaurant_Map.service.boardServiceImpl;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class boardController {
    private final boardServiceImpl boardService;

    @PostMapping(value = "board/addPost")
    public int addPost(@RequestBody HashMap<String, String> map, HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null && session.getAttribute("loginUser") != null){
            return boardService.addPost(map.get("userId"), new Board(map.get("title"),map.get("body"),map.get("uploadDate")));
        }
        else {
            return 2;
        }
    }

    @GetMapping(value = "board/searchPost")
    public BoardResponseDto searchPost(@RequestParam String userId, HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null && session.getAttribute("loginUser") != null){
            return boardService.searchList(userId);
        }
        else {
            return null;
        }
    }

    @PostMapping(value = "/board/addAdminComment")
    public int addAdminComment(@RequestBody HashMap<String, Object> map , HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null && session.getAttribute("loginUser") != null){
            String userId = (String)map.get("userId");
            long postId = (long)(int)map.get("postId");
            String answerDate = (String)map.get("answerDate");
            String adminAnswer = (String)map.get("adminAnswer");
            return boardService.addAdminComment(userId, postId, adminAnswer, answerDate);
        }
        else {
            return 4;
        }
    }

    @PostMapping(value = "/board/addAdminNotice")
    public int addAdminNotice(@RequestBody HashMap<String, String> map , HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null && session.getAttribute("loginUser") != null) {
            return boardService.addAdminNotice(map.get("userId"), map.get("title"), map.get("body"), map.get("uploadDate"));
        }
        else {
            return 3;
        }
    }
}
