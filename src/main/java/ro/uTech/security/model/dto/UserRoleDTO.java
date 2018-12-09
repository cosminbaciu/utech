package ro.uTech.security.model.dto;

/**
 * Created by an on 25.05.2017.
 */
public class UserRoleDTO {

    private Long userId;
    private Long roleId;

    public UserRoleDTO() {

    }

    public UserRoleDTO(Long userId, Long roleId) {

        this.userId = userId;
        this.roleId = roleId;
    }

    public Long getUserId() {

        return userId;
    }

    public void setUserId(Long userId) {

        this.userId = userId;
    }

    public Long getRoleId() {

        return roleId;
    }

    public void setRoleId(Long roleId) {

        this.roleId = roleId;
    }
}