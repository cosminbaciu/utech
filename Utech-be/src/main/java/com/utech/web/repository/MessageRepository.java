package com.utech.web.repository;

import com.utech.web.model.domain.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository  extends JpaRepository<Message, Long> {

    List<Message> findAllByUserId(Long id);
}
