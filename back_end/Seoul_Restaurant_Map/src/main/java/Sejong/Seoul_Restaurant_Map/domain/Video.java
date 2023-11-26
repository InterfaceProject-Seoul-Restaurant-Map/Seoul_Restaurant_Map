package Sejong.Seoul_Restaurant_Map.domain;

import jakarta.persistence.*;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.util.List;

@NoArgsConstructor
@Entity
@Table(name = "videos")
public class Video {
    @Id
    private String video_id;

    @ManyToOne
    @JoinColumn(name = "playlist_id")
    private Playlists playlist;
    private String youtube_url;
    private String thumb_img;
    private String video_title;
    @Column(name = "video_views")
    private int videoViews;
    private Date date;


    @OneToMany(mappedBy = "video")
    private List<Restaurant_video> restaurantVideoList;

    public List<Restaurant_video> getRestaurantVideoList() {
        return restaurantVideoList;
    }

    public void setRestaurantVideoList(List<Restaurant_video> restaurantVideoList) {
        this.restaurantVideoList = restaurantVideoList;
    }

    public String getVideo_id() {
        return video_id;
    }

    public void setVideo_id(String video_id) {
        this.video_id = video_id;
    }

    public Playlists getPlaylist() {
        return playlist;
    }

    public void setPlaylist(Playlists playlist) {
        this.playlist = playlist;
    }

    public String getYoutube_url() {
        return youtube_url;
    }

    public void setYoutube_url(String youtube_url) {
        this.youtube_url = youtube_url;
    }

    public String getThumb_img() {
        return thumb_img;
    }

    public void setThumb_img(String thumb_img) {
        this.thumb_img = thumb_img;
    }

    public String getVideo_title() {
        return video_title;
    }

    public void setVideo_title(String video_title) {
        this.video_title = video_title;
    }

    public int getVideoViews() {
        return videoViews;
    }

    public void setVideoViews(int video_views) {
        this.videoViews = video_views;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
