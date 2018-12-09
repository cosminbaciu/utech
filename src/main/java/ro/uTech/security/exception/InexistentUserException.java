package ro.uTech.security.exception;

/**
 * Created by an on 25.05.2017.
 */
public class InexistentUserException extends Exception {

    public InexistentUserException(Long userId) {

        super("User with id[" + userId + "] does not exist in our system.");
    }

    public InexistentUserException(String username) {

        super("User with username[" + username + "] does not exist in our system.");
    }
}
