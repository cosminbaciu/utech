package ro.uTech.security.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ro.uTech.security.model.domain.RolePermission;

/**
 * Created by an on 20.04.2017.
 */
public interface RolePermissionRepository extends JpaRepository<RolePermission, Long> {
}
