package ro.uTech.security.exception;

/**
 * Created by vlad.ginju on 5/24/17.
 */
public class InvalidRegistrationException extends RuntimeException {

    private Throwable exception;

    public InvalidRegistrationException(String message, Throwable exception) {
        super(message);
        this.exception = exception;
    }

    public Throwable getException() {

        return exception;
    }
}