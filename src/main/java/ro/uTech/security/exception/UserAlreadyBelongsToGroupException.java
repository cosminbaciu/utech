package ro.uTech.security.exception;


public class UserAlreadyBelongsToGroupException extends Exception {

    public UserAlreadyBelongsToGroupException(Long userId, Long roleId) {

        super("User with id[" + userId + "] already has the role with id[" + roleId + "]");
    }
}
