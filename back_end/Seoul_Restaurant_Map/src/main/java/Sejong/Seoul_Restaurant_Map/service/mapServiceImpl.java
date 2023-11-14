package Sejong.Seoul_Restaurant_Map.service;

import Sejong.Seoul_Restaurant_Map.domain.Restaurant;
import Sejong.Seoul_Restaurant_Map.dto.restaurantResponseDto;
import Sejong.Seoul_Restaurant_Map.repository.RestaurantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class mapServiceImpl {
    private final RestaurantRepository restaurantRepository;

    public List<restaurantResponseDto> searchByRange(double x_start, double x_end, double y_start, double y_end)
    {
        Pageable pageable = PageRequest.of(0, 20);
        Page<Restaurant> restaurants = restaurantRepository.findByLocationXBetweenAndLocationYBetween(x_start,x_end,y_start,y_end,pageable);

        List<restaurantResponseDto> results = restaurants.getContent().stream()
                .map(o -> new restaurantResponseDto(o)).collect(Collectors.toList());
        return results;
    }
}
