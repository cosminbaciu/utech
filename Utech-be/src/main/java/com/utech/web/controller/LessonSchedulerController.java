package com.utech.web.controller;


import com.utech.web.model.domain.LessonScheduler;
import com.utech.web.repository.LessonSchedulerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;

@Controller
@RequestMapping("api/lessonScheduler")
public class LessonSchedulerController {

    @Autowired
    private LessonSchedulerRepository lessonSchedulerRepository;

    @RequestMapping (value = "/addLessonScheduler", produces = "application/json", method = RequestMethod.POST)
    public ResponseEntity<LessonScheduler> addLessonScheduler(@RequestBody LessonScheduler lessonScheduler){

        return new ResponseEntity<>(lessonSchedulerRepository.save(lessonScheduler), HttpStatus.CREATED);
    }

    @RequestMapping (value = "/getAllLessonScheduler", produces = "application/json", method = RequestMethod.GET)
    public ResponseEntity<List<LessonScheduler>> getAllLessonSchedulers(){
        return new ResponseEntity<>(lessonSchedulerRepository.findAll(), HttpStatus.OK);
    }
}
