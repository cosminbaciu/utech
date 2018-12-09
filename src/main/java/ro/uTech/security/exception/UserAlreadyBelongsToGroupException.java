package ro.uTech.security.exception;

/**
 * Created by an on 25.05.2017.
 */
public class UserAlreadyBelongsToGroupException extends Exception {

    public UserAlreadyBelongsToGroupException(Long userId, Long roleId) {

        super("User with id[" + userId + "] already has the role with id[" + roleId + "]");
    }
}
