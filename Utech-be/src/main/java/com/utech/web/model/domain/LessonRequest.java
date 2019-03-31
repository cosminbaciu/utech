package com.utech.web.model.domain;


import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "lesson_requests")
public class LessonRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "lesson_id")
    private Long lessonId;

    private Boolean seen;

    @Column(name = "email_sent_flag")
    private Boolean emailSentFlag;

    @Column(name = "createdAt")
    private LocalDate createdAt;

    @Column(name = "updatedAt")
    private LocalDate updatedAt;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getLessonId() {
        return lessonId;
    }

    public void setLessonId(Long lessonId) {
        this.lessonId = lessonId;
    }

    public Boolean getSeen() {
        return seen;
    }

    public void setSeen(Boolean seen) {
        this.seen = seen;
    }

    public Boolean getEmailSentFlag() {
        return emailSentFlag;
    }

    public void setEmailSentFlag(Boolean emailSentFlag) {
        this.emailSentFlag = emailSentFlag;
    }

    public LocalDate getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDate createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDate getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDate updatedAt) {
        this.updatedAt = updatedAt;
    }

    @Override
    public String toString() {
        return "LessonRequest{" +
                "id=" + id +
                ", userId=" + userId +
                ", lessonId=" + lessonId +
                ", emailSentFlag=" + emailSentFlag +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                '}';
    }
}
