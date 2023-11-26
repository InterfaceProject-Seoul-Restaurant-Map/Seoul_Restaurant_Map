package Sejong.Seoul_Restaurant_Map.service;

import Sejong.Seoul_Restaurant_Map.domain.User;
import Sejong.Seoul_Restaurant_Map.domain.UserRestaurantList;
import Sejong.Seoul_Restaurant_Map.domain.UserRestaurantListInfo;
import Sejong.Seoul_Restaurant_Map.dto.findListResponseDto;
import Sejong.Seoul_Restaurant_Map.dto.listResponseDto;
import Sejong.Seoul_Restaurant_Map.dto.listRestaurantDto;
import Sejong.Seoul_Restaurant_Map.repository.UserRepository;
import Sejong.Seoul_Restaurant_Map.repository.UserRestaurantListRepository;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class listServiceImpl {

    private final UserRepository userRepository;

    public List<listResponseDto> searchMyList(String userId)
    {
        Optional<User> userOptional = userRepository.findById(userId);

        if (userOptional.isPresent())
        {
            User user = userOptional.get();
            List<UserRestaurantListInfo> userList = user.getInfoList();
            return userList.stream().map(o -> new listResponseDto(o)).collect(Collectors.toList());
        }
        else {
            return null;
        }
    }

    public List<findListResponseDto> findList(String userId)
    {
        Optional<User> userOptional = userRepository.findById(userId);

        if (userOptional.isPresent())
        {
            User user = userOptional.get();
            return user.getInfoList().stream().map(o -> new findListResponseDto(o)).collect(Collectors.toList());
        }
        else
            return null;
    }

}
