package Sejong.Seoul_Restaurant_Map.service;

import Sejong.Seoul_Restaurant_Map.domain.Board;
import Sejong.Seoul_Restaurant_Map.domain.User;
import Sejong.Seoul_Restaurant_Map.dto.BoardPostResponseDto;
import Sejong.Seoul_Restaurant_Map.dto.BoardResponseDto;
import Sejong.Seoul_Restaurant_Map.repository.BoardRepository;
import Sejong.Seoul_Restaurant_Map.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class boardServiceImpl {

    private final BoardRepository boardRepository;
    private final UserRepository userRepository;

    public int addPost(String userId, Board board) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent())
        {
            User user = userOptional.get();
            board.setUser(user);
            user.getBoards().add(board);
            boardRepository.save(board);
            return 0;
        }
        else
            return 1;
    }

    public BoardResponseDto searchList(String userId)
    {
        List<Board> posts = boardRepository.findAll();

        List<Board> notices = posts.stream().filter(o -> o.getIsNotice()).collect(Collectors.toList());
        posts.removeIf(o -> o.getIsNotice());

        List<BoardPostResponseDto> normal = posts.stream().map(o -> new BoardPostResponseDto(o)).collect(Collectors.toList());
        List<BoardPostResponseDto> notice = notices.stream().map(o -> new BoardPostResponseDto(o)).collect(Collectors.toList());

        normal.sort(BoardPostResponseDto.comparator);
        notice.sort(BoardPostResponseDto.comparator);

        BoardResponseDto rtn = new BoardResponseDto(notice, normal);
        return rtn;
    }

    public int addAdminComment(String userId, Long postId, String adminAnswer, String answerDate) {

        if (userId.equals("admin"))
        {
            Optional<User> userOptional = userRepository.findById(userId);
            if (userOptional.isPresent())
            {
                Optional<Board> boardOptional = boardRepository.findById(postId);
                if (boardOptional.isPresent()) {
                    Board board = boardOptional.get();
                    board.setAdminAnswer(adminAnswer);
                    board.setAnswerDate(answerDate);
                    boardRepository.save(board);
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
                Board board = new Board(title, body, uploadDate);
                board.setIsNotice(true);
                board.setUser(user);
                user.getBoards().add(board);
                boardRepository.save(board);
                return 0;
            }
            else
                return 2;
        }
        else
            return 1;
    }
}
