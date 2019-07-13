package com.utech.web.model.dtos;

import com.utech.web.model.User;
import com.utech.web.model.domain.Lesson;

public class LessonDTO {

    private Lesson lesson;
    private User user;

    public Lesson getLesson() {
        return lesson;
    }

    public void setLesson(Lesson lesson) {
        this.lesson = lesson;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
