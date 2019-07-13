package com.utech.web.repository;

import com.utech.web.model.domain.FileSender;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FileSenderRespository extends JpaRepository<FileSender, Long> {

    List<FileSender> findAllByUserId(Long userId);


}
