package ro.uTech.security.exception;

public class EmailExistsException extends Exception {

    public EmailExistsException(String message){
        super(message);
    }
}
