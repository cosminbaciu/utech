package com.utech.web.repository;

import com.utech.web.model.domain.LessonScheduler;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LessonSchedulerRepository extends JpaRepository<LessonScheduler, Long> {

    List<LessonScheduler> findAllByLessonRequestId(Long id);
}
