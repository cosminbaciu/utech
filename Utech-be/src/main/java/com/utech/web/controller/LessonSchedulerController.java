package com.utech.web.controller;


import com.utech.web.model.domain.LessonRequest;
import com.utech.web.model.domain.LessonScheduler;
import com.utech.web.repository.LessonRequestRepository;
import com.utech.web.repository.LessonSchedulerRepository;
import com.utech.web.security.CurrentUser;
import com.utech.web.security.UserPrincipal;
import com.utech.web.service.LessonSchedulerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.List;

@Controller
@RequestMapping("api/lessonScheduler")
public class LessonSchedulerController {

    @Autowired
    private LessonSchedulerRepository lessonSchedulerRepository;

    @Autowired
    private LessonRequestRepository lessonRequestRepository;

    @Autowired
    private LessonSchedulerService lessonSchedulerService;

    @RequestMapping (value = "/addLessonScheduler", produces = "application/json", method = RequestMethod.POST)
    public ResponseEntity<LessonScheduler> addLessonScheduler(@RequestBody LessonScheduler lessonScheduler){

        lessonScheduler.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        lessonScheduler.setDone(false);

        return new ResponseEntity<>(lessonSchedulerRepository.save(lessonScheduler), HttpStatus.CREATED);
    }

    @RequestMapping (value = "/getAllLessonScheduler", produces = "application/json", method = RequestMethod.GET)
    public ResponseEntity<List<LessonScheduler>> getAllLessonSchedulers(){
        return new ResponseEntity<>(lessonSchedulerRepository.findAll(), HttpStatus.OK);
    }

    @RequestMapping (value = "/getNextLessons", produces = "application/json", method = RequestMethod.GET)
    public ResponseEntity<List<LessonScheduler>> getNextLessons(@CurrentUser UserPrincipal currentUser){

        return new ResponseEntity<>(lessonSchedulerService.getNextLessonsPerUser(currentUser.getId()), HttpStatus.OK);
    }



}
