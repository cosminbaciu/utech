package com.utech.web.repository;

import com.utech.web.model.domain.LessonRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LessonRequestRepository extends JpaRepository<LessonRequest, Long> {

    List<LessonRequest> findAllByUserId(Long userId);

    List<LessonRequest> findAllByLessonId(Long lessonId);

}
