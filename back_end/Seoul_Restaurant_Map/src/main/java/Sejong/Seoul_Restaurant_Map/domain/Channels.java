package Sejong.Seoul_Restaurant_Map.domain;

import jakarta.persistence.*;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@Entity
@Table(name = "channels")
public class Channels {
    @Id
    private String channel_id;
    @OneToMany(mappedBy = "channels")
    private List<Playlists> playlists;
    @Column(name = "channel_name")
    private String channelName;
    @Column(name = "channel_thumb")
    private String channelThumb;
    private int subscriber_count, views;

    public String getChannel_id() {
        return channel_id;
    }

    public void setChannel_id(String channel_id) {
        this.channel_id = channel_id;
    }

    public List<Playlists> getPlaylists() {
        return playlists;
    }

    public void setPlaylists(List<Playlists> playlists) {
        this.playlists = playlists;
    }

    public String getChannelName() {
        return channelName;
    }

    public void setChannelName(String channel_name) {
        this.channelName = channel_name;
    }

    public String getChannelThumb() {
        return channelThumb;
    }

    public void setChannelThumb(String channel_thumb) {
        this.channelThumb = channel_thumb;
    }

    public int getSubscriber_count() {
        return subscriber_count;
    }

    public void setSubscriber_count(int subscriber_count) {
        this.subscriber_count = subscriber_count;
    }

    public int getViews() {
        return views;
    }

    public void setViews(int views) {
        this.views = views;
    }
}
