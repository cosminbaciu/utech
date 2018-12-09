package ro.uTech.security.model.dto;

import org.hibernate.validator.constraints.NotEmpty;

import javax.validation.constraints.NotNull;


public class RoleDTO {

    @NotNull
    @NotEmpty
    private String name;

    public String getName() {

        return name;
    }

    public void setName(String name) {

        this.name = name;
    }
}
