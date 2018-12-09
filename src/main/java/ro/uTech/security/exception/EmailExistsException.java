package ro.uTech.security.exception;

/**
 * Created by an on 20.04.2017.
 */
public class EmailExistsException extends Exception {

    public EmailExistsException(String message){
        super(message);
    }
}
