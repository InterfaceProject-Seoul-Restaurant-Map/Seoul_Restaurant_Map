package Sejong.Seoul_Restaurant_Map.dto;

import Sejong.Seoul_Restaurant_Map.domain.Board;

import java.util.Comparator;

public class BoardPostResponseDto {
    private String userId;
    private String title;
    private String body;
    private String uploadDate;
    private String adminAnswer;
    private String answerDate;
    private Long postId;
    private boolean deleteAuth;

    public BoardPostResponseDto(Board board, String myId) {
        this.userId = board.getUser().getUser_id();
        this.title = board.getTitle();
        this.body = board.getBody();
        this.uploadDate = board.getUploadDate();
        this.adminAnswer = board.getAdminAnswer();
        this.answerDate = board.getAnswerDate();
        this.postId = board.getPostId();
        if (myId.equals(userId))
            deleteAuth = true;
        else if (myId.equals("admin"))
            deleteAuth = true;
        else
            deleteAuth = false;
    }

    public static final Comparator<BoardPostResponseDto> comparator = new Comparator<BoardPostResponseDto>() {
        @Override
        public int compare(BoardPostResponseDto o1, BoardPostResponseDto o2) {
            return Long.valueOf(o2.postId - o1.postId).intValue();
        }
    };

    public boolean isDeleteAuth() {
        return deleteAuth;
    }

    public void setDeleteAuth(boolean deleteAuth) {
        this.deleteAuth = deleteAuth;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public String getUploadDate() {
        return uploadDate;
    }

    public void setUploadDate(String uploadDate) {
        this.uploadDate = uploadDate;
    }

    public String getAdminAnswer() {
        return adminAnswer;
    }

    public void setAdminAnswer(String adminAnswer) {
        this.adminAnswer = adminAnswer;
    }

    public String getAnswerDate() {
        return answerDate;
    }

    public void setAnswerDate(String answerDate) {
        this.answerDate = answerDate;
    }

    public Long getPostId() {
        return postId;
    }

    public void setPostId(Long postId) {
        this.postId = postId;
    }
}
