package Sejong.Seoul_Restaurant_Map.dto;

import Sejong.Seoul_Restaurant_Map.domain.Playlists;
import Sejong.Seoul_Restaurant_Map.domain.Restaurant;
import Sejong.Seoul_Restaurant_Map.domain.Video;

public class videoDto {
    private int view;
    private String thumb;
    private String channel;

    public videoDto(Video videos) {
        this.view = videos.getVideo_views();
        this.thumb = videos.getThumb_img();
        Playlists playlists =  videos.getPlaylist();
        this.channel = playlists.getChannels().getChannelName();
    }

    @Override
    public boolean equals(Object o){
        if (o instanceof videoDto) {
            return thumb.equals(((videoDto) o).thumb);
        }
        return false;
    }
    @Override
    public int hashCode() {
        return thumb.hashCode();
    }

    public int getView() {
        return view;
    }

    public void setView(int view) {
        this.view = view;
    }

    public String getThumb() {
        return thumb;
    }

    public void setThumb(String thumb) {
        this.thumb = thumb;
    }

    public String getChannel() {
        return channel;
    }

    public void setChannel(String channel) {
        this.channel = channel;
    }
}
