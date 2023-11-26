package Sejong.Seoul_Restaurant_Map.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="users")
public class User {
    @Id
    private String user_id;

    private String userName, userEmail, userPassword;

    @OneToMany(mappedBy = "user")
    private List<UserRestaurantListInfo> infoList;

    public String getUser_id() {
        return user_id;
    }

    public void setUser_id(String user_id) {
        this.user_id = user_id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String user_name) {
        this.userName = user_name;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String user_email) {
        this.userEmail = user_email;
    }

    public String getUserPassword() {
        return userPassword;
    }

    public void setUserPassword(String user_password) {
        this.userPassword = user_password;
    }

    public List<UserRestaurantListInfo> getInfoList() {
        return infoList;
    }

    public void setInfoList(List<UserRestaurantListInfo> infoList) {
        this.infoList = infoList;
    }
}
