package ro.uTech.security.exception;


public class PermissionAlreadyBelongsToRoleException extends Exception {

    public PermissionAlreadyBelongsToRoleException(Long roleId, Long permissionId) {

        super("Role with id[" + roleId + "] already has the permission with id[" + permissionId + "]");
    }
}
