package com.utech.web.model.dtos;

import java.sql.Timestamp;
import java.time.LocalDate;

public class MessageDTO {

    private Long id;
    private String senderName;
    private Long userId;
    private String message;
    private Long lessonRequestId;
    private Timestamp date;
    private Timestamp createdAt;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSenderName() {
        return senderName;
    }

    public void setSenderName(String senderName) {
        this.senderName = senderName;
    }

    public Long getUserId() {
        return userId;
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

    public Timestamp getDate() {
        return date;
    }

    public void setDate(Timestamp date) {
        this.date = date;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }
}
