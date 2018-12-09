package ro.uTech.security.model.dto;

import org.hibernate.validator.constraints.NotEmpty;

import javax.validation.constraints.NotNull;

public class ChangeEmailDTO {


    @NotNull
    @NotEmpty
    private String Password;//TODO: use java naming conventions

    @NotNull
    @NotEmpty
    private String email;

    public String getPassword() {
        return Password;
    }

    public void setPassword(String password) {
        Password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
