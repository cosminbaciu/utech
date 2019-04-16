package com.utech.web.controller;


import com.utech.web.model.dtos.MessageDTO;
import com.utech.web.security.CurrentUser;
import com.utech.web.security.UserPrincipal;
import com.utech.web.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;

@Controller
@RequestMapping("/api/messages")
public class MessageController {

    @Autowired
    private MessageService messageService;

    @RequestMapping (value = "/getMessagesByUser", produces = "application/json", method = RequestMethod.GET)
    public ResponseEntity<List<MessageDTO>> getMessagesByUser(@CurrentUser UserPrincipal currentUser){

        return new ResponseEntity<>(messageService.getMessagesByUser(currentUser.getId()), HttpStatus.OK);
    }
}
