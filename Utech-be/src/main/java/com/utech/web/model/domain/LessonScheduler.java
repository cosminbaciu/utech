package com.utech.web.model.domain;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "lesson_scheduler")
public class LessonScheduler {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column (name = "lesson_id")
    private Long lessonId;

    @Column (name = "user_id")
    private Long userId;

    @Column (name = "scheduled_at")
    private LocalDate scheduledAt;

    @Column (name = "created_at")
    private LocalDate createdAt;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getLessonId() {
        return lessonId;
    }

    public void setLessonId(Long lessonId) {
        this.lessonId = lessonId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public LocalDate getScheduledAt() {
        return scheduledAt;
    }

    public void setScheduledAt(LocalDate scheduledAt) {
        this.scheduledAt = scheduledAt;
    }

    public LocalDate getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDate createdAt) {
        this.createdAt = createdAt;
    }

    @Override
    public String toString() {
        return "LessonScheduler{" +
                "id=" + id +
                ", lessonId=" + lessonId +
                ", userId=" + userId +
                ", scheduledAt=" + scheduledAt +
                ", createdAt=" + createdAt +
                '}';
    }
}
