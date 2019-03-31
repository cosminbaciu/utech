package com.utech.web.controller;


import com.utech.web.model.domain.Category;
import com.utech.web.model.domain.Domain;
import com.utech.web.repository.DomainRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;

@Controller
@RequestMapping("api/domains")
public class DomainController {

    @Autowired
    private DomainRepository domainRepository;

    @RequestMapping (value = "/addDomain", produces = "application/json", method = RequestMethod.POST)
    public ResponseEntity<Domain> addDomain(@RequestBody Domain domain){

        return new ResponseEntity<>(domainRepository.save(domain), HttpStatus.CREATED);
    }

    @RequestMapping (value = "/getAllDomain", produces = "application/json", method = RequestMethod.GET)
    public ResponseEntity<List<Domain>> getAllDomains(){
        return new ResponseEntity<>(domainRepository.findAll(), HttpStatus.OK);
    }
}
