package ro.uTech.security.model.dto;

import org.hibernate.validator.constraints.NotEmpty;

import javax.validation.constraints.NotNull;

/**
 * Created by vlad.ginju on 6/12/17.
 */
public class ResetPasswordDTO {

    @NotNull
    @NotEmpty
    private String email;


    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

}
