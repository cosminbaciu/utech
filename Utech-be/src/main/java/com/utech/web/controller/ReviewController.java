package com.utech.web.controller;


import com.utech.web.model.domain.Lesson;
import com.utech.web.model.domain.Review;
import com.utech.web.repository.ReviewRepository;
import com.utech.web.security.CurrentUser;
import com.utech.web.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.sql.Timestamp;

@Controller
@RequestMapping("/api/review")
public class ReviewController {

    @Autowired
    private ReviewRepository reviewRepository;

    @RequestMapping (value = "/add", produces = "application/json", method = RequestMethod.POST)
    public ResponseEntity<Review> addReview(@RequestBody Review review, @CurrentUser UserPrincipal currentUser){

        review.setReviewerId(currentUser.getId());
        review.setCreatedAt(new Timestamp(System.currentTimeMillis()));

        return new ResponseEntity<>(reviewRepository.save(review), HttpStatus.CREATED);
    }
}
