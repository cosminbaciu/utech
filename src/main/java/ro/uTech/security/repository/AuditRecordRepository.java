package ro.uTech.security.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ro.uTech.security.model.domain.AuditRecord;

@Repository
public interface AuditRecordRepository extends JpaRepository<AuditRecord, Long> {

}
