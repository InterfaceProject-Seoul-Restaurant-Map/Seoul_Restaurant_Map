package Sejong.Seoul_Restaurant_Map.service;

import Sejong.Seoul_Restaurant_Map.domain.RequestBoard;
import Sejong.Seoul_Restaurant_Map.domain.User;
import Sejong.Seoul_Restaurant_Map.dto.requestListResponseDto;
import Sejong.Seoul_Restaurant_Map.repository.RequestBoardRepository;
import Sejong.Seoul_Restaurant_Map.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class requestBoardServiceImpl {

    private final RequestBoardRepository requestBoardRepository;
    private final UserRepository userRepository;

    public int requestRestaurant(String userId, String channelName, String restaurantName, String url) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent())
        {
            User user = userOptional.get();
            RequestBoard create = new RequestBoard(user, channelName, restaurantName, url);
            user.getRequestBoards().add(create);
            requestBoardRepository.save(create);
            return 0;
        }
        else
            return 1;
    }

    public List<requestListResponseDto> searchRequestList(String userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent())
        {
            User user = userOptional.get();
            List<RequestBoard> requestBoardList = requestBoardRepository.findAll();
            List<requestListResponseDto> rtn = requestBoardList.stream()
                    .map(o -> new requestListResponseDto(o, userId))
                    .collect(Collectors.toList());
            return rtn;
        }
        else
            return null;
    }

    public int deleteMyRequestElement(String userId, Long requestId) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent())
        {
            User user = userOptional.get();
            Optional<RequestBoard> requestBoardOptional = requestBoardRepository.findById(requestId);
            if (requestBoardOptional.isPresent())
            {
                RequestBoard requestBoard = requestBoardOptional.get();
                user.getRequestBoards().remove(requestBoard);
                requestBoardRepository.delete(requestBoard);
                return 0;
            }
            else
                return 2;
        }
        else
            return 1;
    }

    public int addComment(String userId, Long requestId ,String comment)
    {
        if (userId.equals("admin"))
        {
            Optional<RequestBoard> requestBoard = requestBoardRepository.findById(requestId);
            if (requestBoard.isPresent())
            {
                RequestBoard request = requestBoard.get();
                request.setAdminAnswer(comment);
                requestBoardRepository.save(request);
                return 0;
            }
            else
                return 2;
        }
        else
            return 1;
    }

    public int updateRequestStatus(String userId, Long requestId, String status)
    {
        if (userId.equals("admin"))
        {
            Optional<RequestBoard> requestBoard = requestBoardRepository.findById(requestId);
            if (requestBoard.isPresent())
            {
                RequestBoard request = requestBoard.get();
                request.setStatus(status);
                requestBoardRepository.save(request);
                return 0;
            }
            else
                return 2;
        }
        else
            return 1;
    }
}
