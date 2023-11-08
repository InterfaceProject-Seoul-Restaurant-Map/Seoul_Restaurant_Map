package Sejong.Seoul_Restaurant_Map.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.NoArgsConstructor;

import java.util.Set;

@NoArgsConstructor
@Entity
@Table(name = "channels")
public class Channels {
    @Id
    private String channel_id;
    @OneToMany(mappedBy = "channels")
    private Set<Playlists> playlists;
    private String channel_name, channel_thumb;
    private int subscriber_count, views;

    public String getChannel_id() {
        return channel_id;
    }

    public void setChannel_id(String channel_id) {
        this.channel_id = channel_id;
    }

    public Set<Playlists> getPlaylists() {
        return playlists;
    }

    public void setPlaylists(Set<Playlists> playlists) {
        this.playlists = playlists;
    }

    public String getChannel_name() {
        return channel_name;
    }

    public void setChannel_name(String channel_name) {
        this.channel_name = channel_name;
    }

    public String getChannel_thumb() {
        return channel_thumb;
    }

    public void setChannel_thumb(String channel_thumb) {
        this.channel_thumb = channel_thumb;
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
