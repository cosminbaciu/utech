package ro.uTech.security.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ro.uTech.security.model.domain.RolePermission;


public interface RolePermissionRepository extends JpaRepository<RolePermission, Long> {
}
