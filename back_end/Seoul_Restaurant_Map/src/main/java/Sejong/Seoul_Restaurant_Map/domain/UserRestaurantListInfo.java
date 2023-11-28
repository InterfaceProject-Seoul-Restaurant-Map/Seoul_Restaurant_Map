package Sejong.Seoul_Restaurant_Map.domain;

import jakarta.persistence.*;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import java.util.List;

@NoArgsConstructor
@Entity
@Table(name="user_list_features")
public class UserRestaurantListInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long user_list_id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "info", cascade = CascadeType.ALL)
    private List<UserRestaurantList> restaurantList;

    @Column(name = "list_nickname")@NonNull
    private String listNickname;
    private String list_object;
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

    public List<UserRestaurantList> getRestaurantList() {
        return restaurantList;
    }

    public void setRestaurantList(List<UserRestaurantList> restaurant_set) {
        this.restaurantList = restaurant_set;
    }

    public String getListNickname() {
        return listNickname;
    }

    public void setListNickname(String listNickname) {
        this.listNickname = listNickname;
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
