//package com.utech.web.service;
//
//import com.utech.web.model.domain.LessonRequest;
//import com.utech.web.model.domain.LessonScheduler;
//import com.utech.web.model.dtos.LessonHistoryDTO;
//import com.utech.web.repository.LessonRequestRepository;
//import com.utech.web.repository.LessonSchedulerRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.sql.Timestamp;
//import java.util.ArrayList;
//import java.util.List;
//import java.util.concurrent.TimeUnit;
//
//@Service
//public class LessonHistoryService {
//
//
//
//    @Autowired
//    private LessonSchedulerRepository lessonSchedulerRepository;
//
//    @Autowired
//    private LessonRequestRepository lessonRequestRepository;
//
//    public List<LessonHistoryDTO>  getLessonHistory(Long userId){
//
//        List<LessonHistoryDTO> lessonHistoryDTOS = new ArrayList<>();
//
//        List<LessonRequest> lessonRequests = lessonRequestRepository.findAllByUserId(userId);
//
//        List<LessonScheduler> lessonSchedulers = new ArrayList<>();
//
//        for(LessonRequest lessonRequest : lessonRequests){
//
//            List<LessonScheduler> scheduler = lessonSchedulerRepository.findAllByLessonRequestId(lessonRequest.getId());
//
//            for(LessonScheduler lessonScheduler: scheduler) {
//
//                if(lessonScheduler.getDone())
//                    lessonSchedulers.add(lessonScheduler);
//            }
//        }
//
//
//
//    }
//
//
//}
