package ro.uTech.security.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import ro.uTech.security.model.domain.Permission;
import ro.uTech.security.model.domain.Role;

/**
 * Created by an on 24.05.2017.
 */
public interface PermissionRepository extends JpaRepository<Permission, Long> {

    Role findByName(@Param("name") String name);
}