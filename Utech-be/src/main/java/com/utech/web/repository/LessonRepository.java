package com.utech.web.repository;

import com.utech.web.model.domain.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LessonRepository extends JpaRepository<Lesson, Long> {


    List<Lesson> findAllByUserId(Long id);
    List<Lesson> findAllByDomainId(Long id);

    List<Lesson>  findAllByNameContains(String keyword);
}
