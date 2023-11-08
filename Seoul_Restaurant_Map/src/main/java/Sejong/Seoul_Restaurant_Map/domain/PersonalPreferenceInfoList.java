package Sejong.Seoul_Restaurant_Map.domain;

import jakarta.persistence.*;
import lombok.NoArgsConstructor;

import java.util.Set;

@NoArgsConstructor
@Entity
@Table(name="user_list_features")
public class PersonalPreferenceInfoList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long user_list_id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "info")
    private Set<PersonalPreferenceList> restaurant_set;

    private String list_nickname, list_object;
    private int list_size, list_color;

    public Long getUser_list_id() {
        return user_list_id;
    }

    public void setUser_list_id(Long user_list_id) {
        this.user_list_id = user_list_id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<PersonalPreferenceList> getRestaurant_set() {
        return restaurant_set;
    }

    public void setRestaurant_set(Set<PersonalPreferenceList> restaurant_set) {
        this.restaurant_set = restaurant_set;
    }

    public String getList_nickname() {
        return list_nickname;
    }

    public void setList_nickname(String list_nickname) {
        this.list_nickname = list_nickname;
    }

    public String getList_object() {
        return list_object;
    }

    public void setList_object(String list_object) {
        this.list_object = list_object;
    }

    public int getList_size() {
        return list_size;
    }

    public void setList_size(int list_size) {
        this.list_size = list_size;
    }

    public int getList_color() {
        return list_color;
    }

    public void setList_color(int list_color) {
        this.list_color = list_color;
    }
}
