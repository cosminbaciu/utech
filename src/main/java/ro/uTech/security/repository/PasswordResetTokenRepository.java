package ro.uTech.security.repository;

import org.springframework.data.repository.CrudRepository;
import ro.uTech.security.model.domain.PasswordResetToken;
import ro.uTech.security.model.domain.User;

/**
 * Created by vlad.ginju on 5/26/17.
 */
public interface PasswordResetTokenRepository extends CrudRepository<PasswordResetToken, Long> {
    PasswordResetToken findByToken(String token);
    void findByUser(User user);
}
