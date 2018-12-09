package ro.uTech.security.model.domain;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import org.springframework.data.annotation.Version;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by an on 19.04.2017.
 */
@Entity
@Table(name = "role_permissions")
@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class, property = "id")
public class RolePermission {

    private Long id;
    private Role role;
    private Permission permission;
    private Date createdAt;
    private Date updatedAt;

    @Id
    @Column(name = "id")
    @SequenceGenerator(name = "role_permissions_id_seq",
            sequenceName = "role_permissions_id_seq",
            allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE,
            generator = "role_permissions_id_seq")
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @ManyToOne
    @JoinColumn(name = "role_id", referencedColumnName = "id")
    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {

        this.role = role;
    }

    @ManyToOne
    @JoinColumn(name = "permission_id", referencedColumnName = "id")
    public Permission getPermission() {
        return permission;
    }

    public void setPermission(Permission permission) {

        this.permission = permission;
    }

    @Column(name = "created_at")
    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    @Version
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "updated_at")
    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }
}
