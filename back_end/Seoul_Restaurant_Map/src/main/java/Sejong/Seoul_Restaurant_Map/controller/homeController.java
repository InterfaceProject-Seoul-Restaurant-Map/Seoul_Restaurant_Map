package Sejong.Seoul_Restaurant_Map.controller;

import Sejong.Seoul_Restaurant_Map.domain.Restaurant;
import Sejong.Seoul_Restaurant_Map.dto.findListResponseDto;
import Sejong.Seoul_Restaurant_Map.dto.restaurantResponseDto;
import Sejong.Seoul_Restaurant_Map.service.listServiceImpl;
import Sejong.Seoul_Restaurant_Map.service.mapServiceImpl;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class homeController {

    private final mapServiceImpl mapService;
    private final listServiceImpl listService;

    @GetMapping(value = "home/search")
    public List<restaurantResponseDto> search(@RequestParam double x_start, @RequestParam double x_end, @RequestParam double y_start, @RequestParam double y_end)
    {
        return mapService.searchByRange(x_start, x_end, y_start, y_end);
    }

    @GetMapping(value = "home/advancedSearch")
    public List<restaurantResponseDto> advancedSearch(@RequestParam List<String> channel, @RequestParam List<String> tag, @RequestParam int views)
    {
        return mapService.searchByAdvanced(channel, tag, views);
    }

    @GetMapping(value = "home/findList")
    public List<findListResponseDto> findList(@RequestParam String userId, HttpServletRequest request)
    {
        HttpSession session = request.getSession(false);
        if (session != null && session.getAttribute("loginUser") != null){
            return listService.findList(userId);
        }
        else {
            return null; // 세션 만료, id없음 등등 실패 조건 만들기.
        }
    }

    @PostMapping(value = "home/addRestaurantToList", produces = "application/json; charset=utf8")
    public int addRestauarantToList(@RequestBody HashMap<String, Object> map, HttpServletRequest request)
    {
        //request.setCharacterEncoding("UTF-8");
        HttpSession session = request.getSession(false);
        if (session != null && session.getAttribute("loginUser") != null){
            long listId = (long)(int)map.get("listId");
            String restaruantName = (String)map.get("restaurantName");
            return listService.addRestaurantToList(restaruantName, listId);
        }
        else {
            return 4; // 세션 유효하지 않음.
        }
    }

}
