package ro.uTech.security.controller;

import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import ro.uTech.security.model.CustomUserDetails;
import ro.uTech.security.service.UserRegistrationServiceSupport;

/**
 * Created by vlad.ginju on 6/9/17.
 */

@Controller
@RequestMapping("/me")
public class UserDetailsController {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());


    @Autowired
    private UserRegistrationServiceSupport userRegistrationServiceSupport;




    @RequestMapping(value = "/me",
            produces = {"application/json"},
            method = RequestMethod.GET)
    public ResponseEntity<String> getUserDetails(@AuthenticationPrincipal CustomUserDetails activeUser){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();
        logger.trace("Principal: " + principal);


        JSONObject responseObject = new JSONObject();
        logger.trace("Current principal: " + activeUser.toString());
        responseObject.put("username", activeUser.getUsername());
        responseObject.put("email", activeUser.getEmail());


        return new ResponseEntity<>(responseObject.toString(), HttpStatus.OK);
    }


    @RequestMapping(value = "/userRegistered",
            produces = {"application/json"},
            consumes = {"application/json"}, method = RequestMethod.POST)
    public ResponseEntity<String> getUserDetails(@RequestParam("email") String email) {

        JSONObject responseObject = new JSONObject();

        if (userRegistrationServiceSupport.isUserRegistered(email))
            responseObject.put("Response", "User is registered");
        else responseObject.put("Response", "User is not registered");

        return new ResponseEntity<>(responseObject.toString(), HttpStatus.OK);
    }

}
