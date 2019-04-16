package com.utech.web.model.domain;


import javax.persistence.*;
import java.sql.Timestamp;
import java.time.LocalDate;

@Entity
@Table( name = "messages")
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(name = "sender_id")
    private
    Long senderId;

    @Column(name = "user_id")
    private
    Long userId;

    @Column(name = "lesson_request_id")
    private
    Long lessonRequestId;

    private String message;

    @Column(name="created_at")
    private Timestamp createdAt;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public Long getSenderId() {
        return senderId;
    }

    public void setSenderId(Long senderId) {
        this.senderId = senderId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getLessonRequestId() {
        return lessonRequestId;
    }

    public void setLessonRequestId(Long lessonRequestId) {
        this.lessonRequestId = lessonRequestId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    @Override
    public String toString() {
        return "Message{" +
                "id=" + id +
                ", senderId=" + senderId +
                ", userId=" + userId +
                ", lessonRequestId=" + lessonRequestId +
                ", message='" + message + '\'' +
                ", createdAt=" + createdAt +
                '}';
    }
}
