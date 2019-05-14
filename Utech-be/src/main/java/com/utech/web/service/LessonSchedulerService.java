package com.utech.web.service;


import com.utech.web.model.domain.Lesson;
import com.utech.web.model.domain.LessonRequest;
import com.utech.web.model.domain.LessonScheduler;
import com.utech.web.model.dtos.LessonScheduleDTO;
import com.utech.web.repository.LessonRepository;
import com.utech.web.repository.LessonRequestRepository;
import com.utech.web.repository.LessonSchedulerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Service
public class LessonSchedulerService {

    @Autowired
    private LessonRequestRepository lessonRequestRepository;

    @Autowired
    private LessonSchedulerRepository lessonSchedulerRepository;

    @Autowired
    private LessonRepository lessonRepository;

    public List<LessonScheduler>  getNextLessonsPerUser(Long userId){


        List<LessonRequest> lessonRequests = lessonRequestRepository.findAllByUserId(userId);

        List<LessonScheduler> lessonSchedulers = new ArrayList<>();


        for(LessonRequest lessonRequest : lessonRequests){

            List<LessonScheduler> scheduler = lessonSchedulerRepository.findAllByLessonRequestId(lessonRequest.getId());

            for(LessonScheduler lessonScheduler: scheduler) {

                Timestamp currentDate = new Timestamp(System.currentTimeMillis()); //+ TimeUnit.HOURS.toMillis(1));


                if(!lessonScheduler.getDone() && currentDate.after(new Timestamp(lessonScheduler.getScheduledAt().getTime() - TimeUnit.HOURS.toMillis(1))))
                    lessonSchedulers.add(lessonScheduler);
            }
        }

        return lessonSchedulers;
    }


    public List<LessonScheduleDTO> getLessonScheduleAsMentor(Long id){

        List<Lesson> myLessonsList =  lessonRepository.findAllByUserId(id);

        List<LessonScheduleDTO> myLEssonScheduleDTOList = new ArrayList<>();

        for(Lesson lesson :myLessonsList)
        {
            List<LessonRequest> myLessonRequests = lessonRequestRepository.findAllByLessonId(lesson.getId());

            for(LessonRequest lessonRequest: myLessonRequests)
            {
                List<LessonScheduler> myLessonSchedulers = lessonSchedulerRepository.findAllByLessonRequestId(lessonRequest.getId());

                for(LessonScheduler lessonScheduler: myLessonSchedulers)
                {
                    myLEssonScheduleDTOList.add(new LessonScheduleDTO(lesson.getName(), lesson.getDescription(), lesson.getPrice(), lessonScheduler.getScheduledAt(), lesson.getUserId(), lessonRequest.getUserId()));
                }
            }
        }

        return myLEssonScheduleDTOList;

    }


}
