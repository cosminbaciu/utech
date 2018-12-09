package ro.uTech.security.exception;


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