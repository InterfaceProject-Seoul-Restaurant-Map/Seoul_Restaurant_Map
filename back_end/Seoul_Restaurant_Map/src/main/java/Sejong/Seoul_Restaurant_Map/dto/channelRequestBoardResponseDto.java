package Sejong.Seoul_Restaurant_Map.dto;

import java.util.List;

public class channelRequestBoardResponseDto {

    private List<channelRequestPostDto> notice;
    private List<channelRequestPostDto> normal;
    private int totalSize;

    public channelRequestBoardResponseDto(List<channelRequestPostDto> notice, List<channelRequestPostDto> normal) {
        this.notice = notice;
        this.normal = normal;
        this.totalSize = notice.size() + normal.size();
    }

    public int getTotalSize() {
        return totalSize;
    }

    public void setTotalSize(int totalSize) {
        this.totalSize = totalSize;
    }

    public List<channelRequestPostDto> getNotice() {
        return notice;
    }

    public void setNotice(List<channelRequestPostDto> notice) {
        this.notice = notice;
    }

    public List<channelRequestPostDto> getNormal() {
        return normal;
    }

    public void setNormal(List<channelRequestPostDto> normal) {
        this.normal = normal;
    }


}
