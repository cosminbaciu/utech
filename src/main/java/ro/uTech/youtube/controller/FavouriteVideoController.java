package ro.uTech.youtube.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import ro.uTech.security.model.CustomUserDetails;
import ro.uTech.security.service.UserRegistrationServiceSupport;
import ro.uTech.youtube.model.domain.FavouriteVideo;
import ro.uTech.youtube.service.FavouriteVideoService;

import javax.validation.Valid;
import java.util.List;

@Controller
@RequestMapping("/favourites")
public class FavouriteVideoController {


    @Autowired
    private FavouriteVideoService favouriteVideoService;

    @Autowired
    private UserRegistrationServiceSupport userRegistrationServiceSupport;



    @RequestMapping(value = "/addToFavourites", produces = "application/json", method = RequestMethod.POST)
    public ResponseEntity<FavouriteVideo> addToFavourite(@Valid @RequestBody FavouriteVideo favouriteVideo, @AuthenticationPrincipal CustomUserDetails activeUser){

        return new ResponseEntity<>(favouriteVideoService.addToFavourite(favouriteVideo, userRegistrationServiceSupport.getUserId(activeUser.getEmail())), HttpStatus.CREATED);
    }

    @RequestMapping(value = "/getAllSeenVideos", produces = "application/json", method = RequestMethod.GET)
    public ResponseEntity<List<FavouriteVideo>> getAllSeenVideos(@AuthenticationPrincipal CustomUserDetails activeUser){
        return new ResponseEntity<>(favouriteVideoService.findAllOrderedByNoOfViews(userRegistrationServiceSupport.getUserId(activeUser.getEmail())), HttpStatus.OK);
    }

    @RequestMapping(value = "/getAllFavouriteVideos", produces = "application/json", method = RequestMethod.GET)
    public ResponseEntity<List<FavouriteVideo>> getAllFavouriteVideos(@AuthenticationPrincipal CustomUserDetails activeUser){
        return new ResponseEntity<>(favouriteVideoService.findFavouriteVideos(userRegistrationServiceSupport.getUserId(activeUser.getEmail())), HttpStatus.OK);
    }

    @RequestMapping(value = "/addAViewForVideo", produces = "application/json", method = RequestMethod.PUT)
    public ResponseEntity<FavouriteVideo> addAViewForVideo(@Valid @RequestBody FavouriteVideo favouriteVideo, @AuthenticationPrincipal CustomUserDetails activeUser){

        return new ResponseEntity<>(favouriteVideoService.addAViewForVideo(favouriteVideo, userRegistrationServiceSupport.getUserId(activeUser.getEmail())), HttpStatus.OK);
    }

}
