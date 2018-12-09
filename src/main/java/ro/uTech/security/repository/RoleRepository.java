package ro.uTech.security.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import ro.uTech.security.model.domain.Role;


public interface RoleRepository extends JpaRepository<Role, Long> {

    Role findByName(@Param("name") String name);

    Page<Role> findByNameContains(@Param("name") String name, Pageable pageRequest);
}
