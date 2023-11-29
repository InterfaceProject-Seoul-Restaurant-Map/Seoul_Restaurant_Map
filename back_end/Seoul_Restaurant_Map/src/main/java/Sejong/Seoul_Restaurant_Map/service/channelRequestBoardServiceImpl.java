package Sejong.Seoul_Restaurant_Map.service;

import Sejong.Seoul_Restaurant_Map.domain.Board;
import Sejong.Seoul_Restaurant_Map.domain.ChannelRequestBoard;
import Sejong.Seoul_Restaurant_Map.domain.User;
import Sejong.Seoul_Restaurant_Map.dto.channelRequestBoardResponseDto;
import Sejong.Seoul_Restaurant_Map.dto.channelRequestPostDto;
import Sejong.Seoul_Restaurant_Map.repository.ChannelRequestBoardRepository;
import Sejong.Seoul_Restaurant_Map.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class channelRequestBoardServiceImpl {
    private final ChannelRequestBoardRepository channelRequestBoardRepository;
    private final UserRepository userRepository;

    public int addPost(String userId, ChannelRequestBoard channelRequestBoard) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent())
        {
            User user = userOptional.get();
            channelRequestBoard.setUser(user);
            user.getChannelRequestBoards().add(channelRequestBoard);
            channelRequestBoardRepository.save(channelRequestBoard);
            return 0;
        }
        else
            return 1;
    }

    public channelRequestBoardResponseDto searchPost(String userId) {
        List<ChannelRequestBoard> posts = channelRequestBoardRepository.findAll();

        List<ChannelRequestBoard> notices = posts.stream().filter(o -> o.isNotice()).collect(Collectors.toList());
        posts.removeIf(o -> o.isNotice());

        List<channelRequestPostDto> notice = notices.stream().map(o -> new channelRequestPostDto(o)).collect(Collectors.toList());
        List<channelRequestPostDto> normal = posts.stream().map(o -> new channelRequestPostDto(o)).collect(Collectors.toList());

        notice.sort(channelRequestPostDto.comparator);
        normal.sort(channelRequestPostDto.comparator);

        channelRequestBoardResponseDto rtn = new channelRequestBoardResponseDto(notice, normal);
        return rtn;
    }

    public int addAdminComment(String userId, Long postId, String adminAnswer, String answerDate) {

        if (userId.equals("admin"))
        {
            Optional<User> userOptional = userRepository.findById(userId);
            if (userOptional.isPresent())
            {
                Optional<ChannelRequestBoard> boardOptional = channelRequestBoardRepository.findById(postId);
                if (boardOptional.isPresent()) {
                    ChannelRequestBoard board = boardOptional.get();
                    board.setAdminAnswer(adminAnswer);
                    board.setAnswerDate(answerDate);
                    channelRequestBoardRepository.save(board);
                    return 0;
                }
                else
                    return 3;
            }
            else
                return 2;
        }
        else
            return 1;
    }

    public int addAdminNotice(String userId, String title, String body, String uploadDate) {

        if (userId.equals("admin"))
        {
            Optional<User> userOptional = userRepository.findById(userId);
            if (userOptional.isPresent())
            {
                User user = userOptional.get();
                ChannelRequestBoard board = new ChannelRequestBoard(title, body, uploadDate);
                board.setNotice(true);
                board.setUser(user);
                user.getChannelRequestBoards().add(board);
                channelRequestBoardRepository.save(board);
                return 0;
            }
            else
                return 2;
        }
        else
            return 1;
    }

    public int updateStateByAdmin(String userId, Long postId, String state) {

        if (userId.equals("admin"))
        {
            Optional<User> userOptional = userRepository.findById(userId);
            if (userOptional.isPresent())
            {
                User user = userOptional.get();
                Optional<ChannelRequestBoard> postOptional = channelRequestBoardRepository.findById(postId);
                if (postOptional.isPresent())
                {
                    ChannelRequestBoard post = postOptional.get();
                    post.setState(state);
                    channelRequestBoardRepository.save(post);
                    return 0;
                }
                else
                    return 3;
            }
            else
                return 2;
        }
        else
            return 1;
    }
}
