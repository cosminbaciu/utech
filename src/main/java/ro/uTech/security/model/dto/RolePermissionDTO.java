package ro.uTech.security.model.dto;


public class RolePermissionDTO {

    private Long roleId;
    private Long permissionId;

    public RolePermissionDTO() {
    }

    public RolePermissionDTO(Long roleId, Long permissionId) {
        this.roleId = roleId;
        this.permissionId = permissionId;
    }

    public Long getRoleId() {
        return roleId;
    }

    public void setRoleId(Long roleId) {
        this.roleId = roleId;
    }

    public Long getPermissionId() {
        return permissionId;
    }

    public void setPermissionId(Long permissionId) {
        this.permissionId = permissionId;
    }
}