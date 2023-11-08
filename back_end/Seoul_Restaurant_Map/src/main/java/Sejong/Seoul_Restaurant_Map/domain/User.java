package Sejong.Seoul_Restaurant_Map.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="users")
public class User {
    @Id
    private String user_id;

    private String user_name, user_email, user_password;

    @OneToMany(mappedBy = "user")
    private Set<PersonalPreferenceInfoList> infoList;

    public String getUser_id() {
        return user_id;
    }

    public void setUser_id(String user_id) {
        this.user_id = user_id;
    }

    public String getUser_name() {
        return user_name;
    }

    public void setUser_name(String user_name) {
        this.user_name = user_name;
    }

    public String getUser_email() {
        return user_email;
    }

    public void setUser_email(String user_email) {
        this.user_email = user_email;
    }

    public String getUser_password() {
        return user_password;
    }

    public void setUser_password(String user_password) {
        this.user_password = user_password;
    }

    public Set<PersonalPreferenceInfoList> getInfoList() {
        return infoList;
    }

    public void setInfoList(Set<PersonalPreferenceInfoList> infoList) {
        this.infoList = infoList;
    }
}
