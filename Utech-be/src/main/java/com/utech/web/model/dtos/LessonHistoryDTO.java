package com.utech.web.model.dtos;

import org.springframework.beans.factory.annotation.Autowired;

import java.security.Timestamp;

public class LessonHistoryDTO {

    private String lessonNAme;
    private String description;
    private String userName;
    private Timestamp date;

    public String getLessonNAme() {
        return lessonNAme;
    }

    public void setLessonNAme(String lessonNAme) {
        this.lessonNAme = lessonNAme;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userId) {
        this.userName = userId;
    }

    public Timestamp getDate() {
        return date;
    }

    public void setDate(Timestamp date) {
        this.date = date;
    }
}
