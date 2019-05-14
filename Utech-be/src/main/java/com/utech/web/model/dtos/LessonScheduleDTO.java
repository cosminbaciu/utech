package com.utech.web.model.dtos;

import java.sql.Timestamp;

public class LessonScheduleDTO {

    private String name;
    private String description;
    private Double price;
    private Timestamp scheduletAt;
    private Long mentorId;
    private Long menteeId;


    public LessonScheduleDTO() {
    }

    public LessonScheduleDTO(String name, String description, Double price, Timestamp scheduletAt, Long mentorId, Long menteeId) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.scheduletAt = scheduletAt;
        this.mentorId = mentorId;
        this.menteeId = menteeId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Timestamp getScheduletAt() {
        return scheduletAt;
    }

    public void setScheduletAt(Timestamp scheduletAt) {
        this.scheduletAt = scheduletAt;
    }

    public Long getMentorId() {
        return mentorId;
    }

    public void setMentorId(Long mentorId) {
        this.mentorId = mentorId;
    }

    public Long getMenteeId() {
        return menteeId;
    }

    public void setMenteeId(Long menteeId) {
        this.menteeId = menteeId;
    }
}
