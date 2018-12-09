package ro.uTech.security.exception;


public class InexistentUserException extends Exception {

    public InexistentUserException(Long userId) {

        super("User with id[" + userId + "] does not exist in our system.");
    }

}
