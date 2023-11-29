package Sejong.Seoul_Restaurant_Map.domain;

import jakarta.persistence.*;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Entity
@Table(name = "board")
public class Board {

    @Id @Column(name = "post_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postId;

    @Column(name = "is_notice")
    private boolean isNotice;

    @Column(name = "title")
    private String title;

    @Column(name = "body")
    private String body;

    @Column(name = "admin_answer")
    private String adminAnswer;

    @Column(name = "upload_date")
    private String uploadDate;

    @Column(name = "answer_date")
    private String answerDate;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Board(String title, String body, String uploadDate) {
        this.isNotice = false;
        this.title = title;
        this.body = body;
        this.uploadDate = uploadDate;
    }

    public String getAnswerDate() {
        return answerDate;
    }

    public void setAnswerDate(String answerDate) {
        this.answerDate = answerDate;
    }

    public Long getPostId() {
        return postId;
    }

    public void setPostId(Long postId) {
        this.postId = postId;
    }

    public boolean getIsNotice() {
        return isNotice;
    }

    public void setIsNotice(boolean notice) {
        isNotice = notice;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public String getAdminAnswer() {
        return adminAnswer;
    }

    public void setAdminAnswer(String adminAnswer) {
        this.adminAnswer = adminAnswer;
    }

    public String getUploadDate() {
        return uploadDate;
    }

    public void setUploadDate(String uploadDate) {
        this.uploadDate = uploadDate;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
