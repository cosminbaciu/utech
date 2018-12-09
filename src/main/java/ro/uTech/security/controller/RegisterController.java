package ro.uTech.security.controller;

import org.json.JSONArray;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import ro.uTech.security.exception.EmailExistsException;
import ro.uTech.security.exception.InvalidRegistrationException;
import ro.uTech.security.exception.InvalidRequestException;
import ro.uTech.security.exception.UsernameExistsException;
import ro.uTech.security.model.CustomUserDetails;
import ro.uTech.security.model.domain.User;
import ro.uTech.security.model.dto.ChangePasswordDTO;
import ro.uTech.security.model.dto.UserDTO;
import ro.uTech.security.service.UserRegistrationServiceSupport;

import javax.validation.Valid;


/**
 * Created by an on 20.04.2017.
 */
@Controller
@RequestMapping("/register")
public class RegisterController {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private static final String DEFAULT_ROLE_NAME = "Clients";

    @Autowired
    private UserRegistrationServiceSupport userRegistrationServiceSupport;



    @Value("${da.frontend.url}")
    private String frontEndUrl;

    @RequestMapping(value = "/register",
            produces = {"application/json"},
            consumes = {"application/json"}, method = RequestMethod.POST)
    public ResponseEntity<String> registerNewUser(@RequestBody @Valid UserDTO userDTO, BindingResult bindingResult){

        JSONObject responseObject = new JSONObject();
        if (bindingResult.hasErrors()) {

            JSONArray errorsArray = new JSONArray();
            for (FieldError fe : bindingResult.getFieldErrors()) {

                logger.trace(fe.toString());
                JSONObject errorObject = new JSONObject();
                errorObject.put(fe.getField(), fe.getDefaultMessage());
                errorsArray.put(errorObject);
            }

            responseObject.put("fieldErrors", errorsArray);

            return new ResponseEntity<>(responseObject.toString(), HttpStatus.BAD_REQUEST);
        }

        User registeredUser;
        try {
            registeredUser = userRegistrationServiceSupport.registerNewUserAccount(userDTO);
        } catch (EmailExistsException | UsernameExistsException e) {

            logger.error(e.toString());
            responseObject.put("registrationError", e.getMessage());
            return new ResponseEntity<>(responseObject.toString(), HttpStatus.BAD_REQUEST);
        }

        responseObject.put("message", "User created!");
        responseObject.put("username", registeredUser.getUsername());
        responseObject.put("email", registeredUser.getEmail());

        return new ResponseEntity<>(responseObject.toString(), HttpStatus.OK);
    }


    @RequestMapping(value = "/changePassword",
            produces = {"application/json"},
            consumes = {"application/json"}, method = RequestMethod.POST)
    public ResponseEntity<String> changePassword(@AuthenticationPrincipal CustomUserDetails activeUser, @RequestBody @Valid ChangePasswordDTO changePasswordDTO, BindingResult bindingResult) {

        JSONObject responseObject = new JSONObject();
        if (bindingResult.hasErrors())
            throw new InvalidRequestException("Invalid request.", bindingResult);

        if(userRegistrationServiceSupport.passwordMatch(activeUser.getEmail(),changePasswordDTO.getOldPassword()))
        {
            if (userRegistrationServiceSupport.isUserRegistered(activeUser.getEmail()))
                userRegistrationServiceSupport.changePassword(activeUser.getEmail(), changePasswordDTO.getNewPassword());
            else
                throw new InvalidRegistrationException("Username is not registered.", new UsernameExistsException("User not found"));
        }
        else throw new InvalidRegistrationException("Password is not the same.", new UsernameExistsException("User not found"));



        responseObject.put("message", "Password changed!");
        responseObject.put("username", activeUser.getEmail());

        return new ResponseEntity<>(responseObject.toString(), HttpStatus.OK);
    }
}
