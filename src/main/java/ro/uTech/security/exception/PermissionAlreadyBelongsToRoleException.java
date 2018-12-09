package ro.uTech.security.exception;

/**
 * Created by an on 25.05.2017.
 */
//TODO: Exception not added to the GlobalHandler
public class PermissionAlreadyBelongsToRoleException extends Exception {

    public PermissionAlreadyBelongsToRoleException(Long roleId, Long permissionId) {

        super("Role with id[" + roleId + "] already has the permission with id[" + permissionId + "]");
    }
}
