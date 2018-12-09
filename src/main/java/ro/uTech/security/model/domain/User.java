package ro.uTech.security.model.domain;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import org.springframework.data.annotation.Version;

import javax.persistence.*;
import java.util.Collection;
import java.util.Date;


@Entity
@Table(name = "users")
@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class, property = "id")
public class User {

    private Long id;
    private String email;
    private String username;
    private String encryptedPassword;
    private Boolean isActive;
    private String resetPasswordToken;
    private Date resetPasswordSentAt;
    private Date createdAt;
    private Date updatedAt;
    private Collection<UserRole> userRoles;
    private Collection<Identity> identities;

    @Id
    @Column(name = "id")
    @SequenceGenerator(name = "users_id_seq",
            sequenceName = "users_id_seq",
            allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE,
            generator = "users_id_seq")
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Column(name = "email")
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Column(name = "username")
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Column(name = "encrypted_password")
    public String getEncryptedPassword() {
        return encryptedPassword;
    }

    public void setEncryptedPassword(String encryptedPassword) {
        this.encryptedPassword = encryptedPassword;
    }

    @Column(name = "is_active")
    public Boolean getActive() {
        return isActive;
    }

    public void setActive(Boolean active) {
        isActive = active;
    }

    @Column(name = "reset_password_token")
    public String getResetPasswordToken() {
        return resetPasswordToken;
    }

    public void setResetPasswordToken(String resetPasswordToken) {
        this.resetPasswordToken = resetPasswordToken;
    }

    @Column(name = "reset_password_sent_at")
    public Date getResetPasswordSentAt() {
        return resetPasswordSentAt;
    }

    public void setResetPasswordSentAt(Date resetPasswordSentAt) {
        this.resetPasswordSentAt = resetPasswordSentAt;
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

    @OneToMany(mappedBy = "user", fetch = FetchType.EAGER)
    public Collection<UserRole> getUserRoles() {
        return userRoles;
    }

    public void setUserRoles(Collection<UserRole> userRoles) {
        this.userRoles = userRoles;
    }

    @OneToMany(mappedBy = "user")
    public Collection<Identity> getIdentities() {
        return identities;
    }

    public void setIdentities(Collection<Identity> userRoles) {
        this.identities = identities;
    }


    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", username='" + username + '\'' +
                ", encryptedPassword='" + encryptedPassword + '\'' +
                ", isActive=" + isActive +
                ", resetPasswordToken='" + resetPasswordToken + '\'' +
                ", resetPasswordSentAt=" + resetPasswordSentAt +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                ", userRoles=" + userRoles +
                ", identities=" + identities +
                '}';
    }
}
