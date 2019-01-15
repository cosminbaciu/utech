package com.utech.web.controller;


import com.utech.web.security.CurrentUser;
import com.utech.web.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import com.utech.web.model.domain.FavouriteVideo;
import com.utech.web.model.dto.FavouriteVideoDTO;
import com.utech.web.security.FavouriteVideoService;

import javax.validation.Valid;
import java.util.List;

@Controller
@RequestMapping("/favourites")
public class FavouriteVideoController {


    @Autowired
    private FavouriteVideoService favouriteVideoService;


    @RequestMapping(value = "/addToFavourites", produces = "application/json", method = RequestMethod.POST)
    public ResponseEntity<FavouriteVideo> addToFavourite(@Valid @RequestBody FavouriteVideoDTO favouriteVideo, @CurrentUser UserPrincipal currentUser){

        return new ResponseEntity<>(favouriteVideoService.addToFavourite(favouriteVideo, currentUser.getId()), HttpStatus.CREATED);
    }

    @RequestMapping(value = "/getAllSeenVideos", produces = "application/json", method = RequestMethod.GET)
    public ResponseEntity<List<FavouriteVideo>> getAllSeenVideos(@CurrentUser UserPrincipal currentUser){
        return new ResponseEntity<>(favouriteVideoService.findAllOrderedByNoOfViews(currentUser.getId()), HttpStatus.OK);
    }

    @RequestMapping(value = "/getAllFavouriteVideos", produces = "application/json", method = RequestMethod.GET)
    public ResponseEntity<List<FavouriteVideo>> getAllFavouriteVideos(@CurrentUser UserPrincipal currentUser){
        return new ResponseEntity<>(favouriteVideoService.findFavouriteVideos(currentUser.getId()), HttpStatus.OK);
    }

    @RequestMapping(value = "/addAViewForVideo", produces = "application/json", method = RequestMethod.PUT)
    public ResponseEntity<FavouriteVideo> addAViewForVideo(@Valid @RequestBody FavouriteVideoDTO favouriteVideo, @CurrentUser UserPrincipal currentUser){

        return new ResponseEntity<>(favouriteVideoService.addAViewForVideo(favouriteVideo, currentUser.getId()), HttpStatus.OK);
    }

}
