package Sejong.Seoul_Restaurant_Map.dto;

import java.util.List;

public class BoardResponseDto {
    private List<BoardPostResponseDto> notice;
    private List<BoardPostResponseDto> normal;
    private int totalSize;

    public BoardResponseDto(List<BoardPostResponseDto> notice, List<BoardPostResponseDto> normal) {
        this.notice = notice;
        this.normal = normal;
        this.totalSize = notice.size() + normal.size();
    }

    public List<BoardPostResponseDto> getNotice() {
        return notice;
    }

    public void setNotice(List<BoardPostResponseDto> notice) {
        this.notice = notice;
    }

    public List<BoardPostResponseDto> getNormal() {
        return normal;
    }

    public void setNormal(List<BoardPostResponseDto> normal) {
        this.normal = normal;
    }

    public int getTotalSize() {
        return totalSize;
    }

    public void setTotalSize(int totalSize) {
        this.totalSize = totalSize;
    }
}
