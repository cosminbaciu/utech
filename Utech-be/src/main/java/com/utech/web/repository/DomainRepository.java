package com.utech.web.repository;

import com.utech.web.model.domain.Domain;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DomainRepository extends JpaRepository<Domain, Long> {

    List<Domain> findAllByCategoryId(Long categoryId);
}
