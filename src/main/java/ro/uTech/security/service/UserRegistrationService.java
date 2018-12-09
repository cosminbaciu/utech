package ro.uTech.security.service;

import ro.uTech.security.model.dto.UserDTO;
import ro.uTech.security.exception.EmailExistsException;
import ro.uTech.security.exception.UsernameExistsException;
import ro.uTech.security.model.domain.User;

/**
 * Created by an on 20.04.2017.
 */
public interface UserRegistrationService {

    User registerNewUserAccount(UserDTO userDTO, String role, String token) throws EmailExistsException, UsernameExistsException;

    boolean isUserRegistered(String email);

    void changePassword(String email, String newPassword);

    void resetPassword(String email);

    void createPasswordResetTokenForUser(final User user, final String token);

    void resendPasswordResetTokenForUser(final User user);
}
