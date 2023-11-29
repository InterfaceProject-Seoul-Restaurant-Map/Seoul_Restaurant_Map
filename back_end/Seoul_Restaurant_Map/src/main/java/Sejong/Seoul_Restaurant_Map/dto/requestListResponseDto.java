package Sejong.Seoul_Restaurant_Map.dto;

import Sejong.Seoul_Restaurant_Map.domain.RequestBoard;

public class requestListResponseDto {

    private String userId;
    private String channelName;
    private String restaurantName;
    private String videoUrl;
    private String status;
    private String adminAnswer;
    private Long requestId;
    private boolean isMine;

    public requestListResponseDto(RequestBoard requestBoard, String myId) {
       this.userId = requestBoard.getUser().getUser_id();
       this.channelName = requestBoard.getChannelName();
       this.restaurantName = requestBoard.getRestaurantName();
       this.videoUrl = requestBoard.getVideoUrl();
       this.status = requestBoard.getStatus();
       this.adminAnswer = requestBoard.getAdminAnswer();
       this.requestId = requestBoard.getRequestId();
       if (myId.equals(this.userId))
           this.isMine = true;
       else
           this.isMine = false;
    }

    public String getAdminAnswer() {
        return adminAnswer;
    }

    public void setAdminAnswer(String adminAnswer) {
        this.adminAnswer = adminAnswer;
    }

    public Long getRequestId() {
        return requestId;
    }

    public void setRequestId(Long requestId) {
        this.requestId = requestId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getChannelName() {
        return channelName;
    }

    public void setChannelName(String channelName) {
        this.channelName = channelName;
    }

    public String getRestaurantName() {
        return restaurantName;
    }

    public void setRestaurantName(String restaurantName) {
        this.restaurantName = restaurantName;
    }

    public String getVideoUrl() {
        return videoUrl;
    }

    public void setVideoUrl(String videoUrl) {
        this.videoUrl = videoUrl;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public boolean isMine() {
        return isMine;
    }

    public void setMine(boolean mine) {
        isMine = mine;
    }
}
