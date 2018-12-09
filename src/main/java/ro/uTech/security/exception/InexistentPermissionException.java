package ro.uTech.security.exception;

/**
 * Created by an on 25.05.2017.
 */
//TODO: Exception not added to the GlobalHandler.
public class InexistentPermissionException extends Exception {

    public InexistentPermissionException(Long roleId) {

        super("Permission with id[" + roleId + "] does not exist in our system.");
    }

    public InexistentPermissionException(String name) {

        super("Permission with name[" + name + "] does not exist in our system.");
    }
}
