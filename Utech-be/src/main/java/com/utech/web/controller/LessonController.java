package com.utech.web.controller;

import com.utech.web.model.domain.Lesson;
import com.utech.web.model.dtos.LessonDTO;
import com.utech.web.repository.LessonRepository;
import com.utech.web.repository.UserRepository;
import com.utech.web.security.CurrentUser;
import com.utech.web.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.websocket.server.PathParam;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/api/lessons")
public class LessonController {

    @Autowired
    private LessonRepository lessonRepository;
    @Autowired
    private UserRepository userRepository;

    @RequestMapping (value = "/addLesson", produces = "application/json", method = RequestMethod.POST)
    public ResponseEntity<Lesson> addLesson(@RequestBody Lesson lesson, @CurrentUser UserPrincipal currentUser){

        lesson.setUserId(currentUser.getId());
        lesson.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        return new ResponseEntity<>(lessonRepository.save(lesson), HttpStatus.CREATED);
    }

    @RequestMapping (value = "/getAllLessons", produces = "application/json", method = RequestMethod.GET)
    public ResponseEntity<List<Lesson>>  getAllLessons(){

        return new ResponseEntity<>(lessonRepository.findAll(), HttpStatus.OK);
    }

    @RequestMapping (value = "/getLesson/{id}", produces = "application/json", method = RequestMethod.GET)
    public ResponseEntity<Lesson> getLessonById(@PathVariable Long id){

        return new ResponseEntity<>(lessonRepository.findById(id).get(), HttpStatus.OK);
    }

    @RequestMapping (value = "/getLessonsByUser", produces = "application/json", method = RequestMethod.GET)
    public ResponseEntity<List<Lesson>> getLessonByUser(@CurrentUser UserPrincipal currentUser){

        return new ResponseEntity<>(lessonRepository.findAllByUserId(currentUser.getId()), HttpStatus.OK);
    }

    @RequestMapping (value = "/getLessonByDomain/{id}", produces = "application/json", method = RequestMethod.GET)
    public ResponseEntity<List<LessonDTO>> getLessonByDomain(@PathVariable Long id){


        List<LessonDTO> lessonDTOs = new ArrayList<>();

        List<Lesson> lessons = lessonRepository.findAllByDomainId(id);

        for(Lesson lesson: lessons)
        {
            LessonDTO lessonDTO = new LessonDTO();
            lessonDTO.setLesson(lesson);
            lessonDTO.setUser(userRepository.findById(lesson.getUserId()).get());

            lessonDTOs.add(lessonDTO);
        }

        return new ResponseEntity<>(lessonDTOs, HttpStatus.OK);
    }


    @RequestMapping (value = "/getLessonByKeyword/{keyword}", produces = "application/json", method = RequestMethod.GET)
    public ResponseEntity<List<LessonDTO>> getLessonByKeyword(@PathVariable String keyword){

        List<LessonDTO> lessonDTOs = new ArrayList<>();

        List<Lesson> lessons = lessonRepository.findAllByNameContains(keyword);

        for(Lesson lesson: lessons)
        {
            LessonDTO lessonDTO = new LessonDTO();
            lessonDTO.setLesson(lesson);
            lessonDTO.setUser(userRepository.findById(lesson.getUserId()).get());

            lessonDTOs.add(lessonDTO);
        }

        return new ResponseEntity<>(lessonDTOs, HttpStatus.OK);
    }

    @RequestMapping (value = "/getLessonByKeywordSearch/{keyword}", produces = "application/json", method = RequestMethod.GET)
    public ResponseEntity<?> getLessonByKeywordSearch(@PathVariable String keyword){

        List<Lesson> lessons = lessonRepository.findAllByNameContains(keyword);
        List<String> lessonsNames = new ArrayList<>();

        for(Lesson lesson:lessons)
            lessonsNames.add(lesson.getName());




        return new ResponseEntity<>(lessonsNames, HttpStatus.OK);

    }






}
