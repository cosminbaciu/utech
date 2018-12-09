package ro.uTech.security.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import ro.uTech.security.model.domain.User;


public interface UserRepository extends JpaRepository<User, Long> {

    User findByEmail(@Param("email") String email);
    
    User findByUsername(@Param("username") String username);

    Page<User> findByEmailContains(@Param("email") String email, Pageable pageRequest);
}
