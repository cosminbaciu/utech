package ro.uTech.security.exception;


public class InexistentRoleException extends Exception {

    public InexistentRoleException(Long roleId) {

        super("Role with id[" + roleId + "] does not exist in our system.");
    }

}
