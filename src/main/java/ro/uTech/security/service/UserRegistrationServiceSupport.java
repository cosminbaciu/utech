package ro.uTech.security.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ro.uTech.security.exception.EmailExistsException;
import ro.uTech.security.exception.UsernameExistsException;
import ro.uTech.security.model.domain.PasswordResetToken;
import ro.uTech.security.model.domain.Role;
import ro.uTech.security.model.domain.User;
import ro.uTech.security.model.domain.UserRole;
import ro.uTech.security.model.dto.UserDTO;
import ro.uTech.security.repository.PasswordResetTokenRepository;
import ro.uTech.security.repository.RoleRepository;
import ro.uTech.security.repository.UserRepository;
import ro.uTech.security.repository.UserRoleRepository;

import java.util.Date;

/**
 * Created by an on 20.04.2017.
 */
@Service
public class UserRegistrationServiceSupport implements UserRegistrationService {

    private static final String CLIENT_ROLE_NAME = "Clients";
    private static final String GUEST_ROLE_NAME = "Guest";
    private int EXPIRY_TIME_IN_MILLIS = 60 * 24 * 60 * 1000;

    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private UserRoleRepository userRoleRepository;

    @Autowired
    private PasswordResetTokenRepository passwordTokenRepository;

    @Override
    @Transactional
    public User registerNewUserAccount(UserDTO userDTO, String role, String token) throws EmailExistsException, UsernameExistsException {

        if(token!= null && userRoleRepository.findByUser(userRepository.findByEmail(token)).getRole().getName().equals(GUEST_ROLE_NAME))
        {

            User user = userRepository.findByEmail(token);

            Role defaultRole = saveDetails(userDTO, role, user);

            UserRole userRole = userRoleRepository.findByUser(user);
            userRole.setRole(defaultRole);
            userRoleRepository.save(userRole);



            return user;

        }

        else {

            User user = new User();

            Role defaultRole = saveDetails(userDTO, role, user);

            UserRole userRole = new UserRole();
            userRole.setRole(defaultRole);
            userRole.setUser(user);

            userRoleRepository.save(userRole);


            return user;
        }



    }

    private Role saveDetails(UserDTO userDTO, String role, User user) throws EmailExistsException, UsernameExistsException {
        if (emailExists(userDTO.getEmail())) {
            throw new EmailExistsException(
                    "There is an account with that email address: " + userDTO.getEmail());
        }
        if (usernameExists(userDTO.getUsername())) {
            throw new UsernameExistsException(
                    "There is an account with that username: " + userDTO.getUsername());
        }

        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String hashedPassword = passwordEncoder.encode(userDTO.getPassword());
        user.setUsername(userDTO.getUsername());
        user.setEmail(userDTO.getEmail());
        user.setEncryptedPassword(hashedPassword);

        return roleRepository.findByName(role);
    }

    @Override
    @Transactional
    public boolean isUserRegistered(String email) {
        return emailExists(email);
    }

    @Override
    public void changePassword(String email, String newPassword) {

        User user = userRepository.findByEmail(email);
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        user.setEncryptedPassword(passwordEncoder.encode(newPassword));

        userRepository.save(user);
    }

    @Override
    public void resetPassword(String email) {

        User user = userRepository.findByEmail(email);


    }


    @Override
    public void createPasswordResetTokenForUser(final User user, final String token) {

        final PasswordResetToken myToken = new PasswordResetToken();
        myToken.setUser(user);
        myToken.setToken(token);
        myToken.setExpiryDate(new Date(System.currentTimeMillis() + EXPIRY_TIME_IN_MILLIS));
        passwordTokenRepository.save(myToken);
    }

    @Override
    public void resendPasswordResetTokenForUser(User user) {

        passwordTokenRepository.findByUser(user);

    }

    public User findUserByEmail(String email) {

        return userRepository.findByEmail(email);
    }


    private boolean emailExists(String email) {

        User user = userRepository.findByEmail(email);
        if (user != null) {
            return true;
        }
        return false;
    }

    private boolean usernameExists(String username) {

        User user = userRepository.findByUsername(username);
        if (user != null) {
            return true;
        }
        return false;
    }

    public boolean passwordMatch(String email, String oldPassword)
    {
        logger.trace("Received email and old password:"+ email + "," + oldPassword);
        User user = userRepository.findByEmail(email);
        if(user ==null) return false;
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        return passwordEncoder.matches(oldPassword, user.getEncryptedPassword());
    }

    public void changeEmail(String oldEmail, String newEmail) {

        User user = userRepository.findByEmail(oldEmail);
        user.setEmail(newEmail);
        userRepository.save(user);
    }


    public Long getUserId(String email){
        return userRepository.findByEmail(email).getId();
    }

}
