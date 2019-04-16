package com.utech.web.controller;

import com.utech.web.model.domain.LessonRequest;
import com.utech.web.model.domain.Mailer;
import com.utech.web.repository.LessonRepository;
import com.utech.web.repository.LessonRequestRepository;
import com.utech.web.security.CurrentUser;
import com.utech.web.security.UserPrincipal;
import com.utech.web.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Controller
@RequestMapping("api/lessonRequest")
public class LessonRequestController {

    @Autowired
    private LessonRequestRepository lessonRequestRepository;

    @Autowired
    private LessonRepository lessonRepository;

    @Autowired
    private MessageService messageService;

    @RequestMapping (value = "/addLessonRequest", produces = "application/json", method = RequestMethod.POST)
    public ResponseEntity<LessonRequest> addLessonRequest(@RequestBody LessonRequest lessonRequest, @CurrentUser UserPrincipal currentUser){

        lessonRequest.setUserId(currentUser.getId());
        lessonRequest.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        lessonRequest.setUpdatedAt(new Timestamp(System.currentTimeMillis()));
        lessonRequest.setSeen(false);
        lessonRequest.setAccepted(false);

        lessonRequest.setDate(new Timestamp(lessonRequest.getDate().getTime() + TimeUnit.HOURS.toMillis(3)));

        try{
            Mailer.send("cosmiin.baciu@gmail.com", "LogareCosy1", "cosmiin.baciu@gmail.com", "Ai primit o solicitare de meditatii", "Am trimis solicitare pentru lectia " + lessonRepository.findById(lessonRequest.getLessonId()).get().getName() + ", pentru data " + lessonRequest.getDate().toString() + ". Esti de acord, sau reprogramam?");
            lessonRequest.setEmailSentFlag(true);
        }
        catch(Exception e){
            e.printStackTrace();
        }

        LessonRequest newLessonRequest = lessonRequestRepository.save(lessonRequest);

        System.out.println(newLessonRequest.getId());

        messageService.addMessage(lessonRequest.getUserId(), lessonRequest.getLessonId(), lessonRequest.getDate(), newLessonRequest.getId());


        return new ResponseEntity<>(newLessonRequest, HttpStatus.CREATED);
    }

    @RequestMapping (value = "/getLessonRequestsByUser", produces = "application/json", method = RequestMethod.GET)
    public ResponseEntity<List<LessonRequest>> getLessonRequestByUser(@CurrentUser UserPrincipal currentUser){

        return new ResponseEntity<>(lessonRequestRepository.findAllByUserId(currentUser.getId()), HttpStatus.OK);
    }

    @RequestMapping (value = "/viewLessonRequest/{id}", produces = "application/json", method = RequestMethod.PUT)
    public ResponseEntity<LessonRequest> viewLessonRequest(@PathVariable("id") Long id){

        LessonRequest lessonRequest = lessonRequestRepository.findById(id).get();

        lessonRequest.setSeen(true);
        lessonRequest.setUpdatedAt(new Timestamp(System.currentTimeMillis()));

        return new ResponseEntity<>(lessonRequestRepository.save(lessonRequest), HttpStatus.CREATED);
    }


}
