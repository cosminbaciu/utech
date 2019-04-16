package com.utech.web.model.domain;

import javax.persistence.*;
import java.sql.Timestamp;
import java.time.LocalDate;

@Entity
@Table(name = "lesson_scheduler")
public class LessonScheduler {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "lesson_request_id")
    private Long lessonRequestId;

    @Column (name = "scheduled_at")
    private Timestamp scheduledAt;

    private Boolean done;

    @Column (name = "created_at")
    private Timestamp createdAt;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getLessonRequestId() {
        return lessonRequestId;
    }

    public void setLessonRequestId(Long lessonRequestId) {
        this.lessonRequestId = lessonRequestId;
    }

    public Timestamp getScheduledAt() {
        return scheduledAt;
    }

    public void setScheduledAt(Timestamp scheduledAt) {
        this.scheduledAt = scheduledAt;
    }

    public Boolean getDone() {
        return done;
    }

    public void setDone(Boolean done) {
        this.done = done;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    @Override
    public String toString() {
        return "LessonScheduler{" +
                "id=" + id +
                ", scheduledAt=" + scheduledAt +
                ", createdAt=" + createdAt +
                '}';
    }
}
