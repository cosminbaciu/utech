package ro.uTech.security.exception;

/**
 * Created by an on 25.05.2017.
 */
public class InexistentRoleException extends Exception {

    public InexistentRoleException(Long roleId) {

        super("Role with id[" + roleId + "] does not exist in our system.");
    }

    public InexistentRoleException(String name) {

        super("Role with name[" + name + "] does not exist in our system.");
    }
}
