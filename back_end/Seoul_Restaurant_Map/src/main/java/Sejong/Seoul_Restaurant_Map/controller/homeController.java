package Sejong.Seoul_Restaurant_Map.controller;

import Sejong.Seoul_Restaurant_Map.domain.Restaurant;
import Sejong.Seoul_Restaurant_Map.service.mapServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class homeController {

    private final mapServiceImpl mapService;

    @GetMapping(value = "home/search")
    public List<Restaurant> search(@RequestParam double x_start, @RequestParam double x_end, @RequestParam double y_start, @RequestParam double y_end)
    {
        return mapService.searchByRange(x_start, x_end, y_start, y_end);
    }


}
