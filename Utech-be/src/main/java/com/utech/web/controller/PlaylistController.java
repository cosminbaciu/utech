package com.utech.web.controller;


import com.utech.web.repository.PlaylistVideoRepository;
import com.utech.web.security.CurrentUser;
import com.utech.web.security.UserPrincipal;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import com.utech.web.model.domain.Playlist;
import com.utech.web.model.domain.PlaylistVideo;
import com.utech.web.security.PlaylistService;
import com.utech.web.security.PlaylistVideoService;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/playlist")
public class PlaylistController {


    @Autowired
    private PlaylistService playlistService;

    @Autowired
    private PlaylistVideoService playlistVideoService;

    @Autowired
    private PlaylistVideoRepository playlistVideoRepository;

    @RequestMapping(value = "/getAll", produces = "application/json", method = RequestMethod.GET)
    public ResponseEntity<List<Playlist>> getAllPlaylists(@CurrentUser UserPrincipal currentUser){
        return new ResponseEntity<>(playlistService.getAll(), HttpStatus.OK);
    }

    @RequestMapping(value = "/create", produces = "application/json", method = RequestMethod.POST)
    public ResponseEntity<Playlist> createPlaylist(@Valid @RequestBody Playlist playlist, @CurrentUser UserPrincipal currentUser){
        return new ResponseEntity<>(playlistService.createPlaylist(playlist), HttpStatus.CREATED);
    }

    @RequestMapping(value = "/update/{id}", produces = "application/json", method = RequestMethod.PUT)
    public ResponseEntity<Playlist> updatePlaylist(@PathVariable("id")Long id, @Valid @RequestBody Playlist playlist, @CurrentUser UserPrincipal currentUser){
        return new ResponseEntity<>(playlistService.updatePlaylist(id, playlist), HttpStatus.CREATED);
    }

    @RequestMapping(value = "/delete/{id}", produces = "application/json", method = RequestMethod.DELETE)
    public ResponseEntity<JSONObject> deletePlaylist(@PathVariable("id")Long id, @CurrentUser UserPrincipal currentUser){

        JSONObject responseObject = new JSONObject();
        playlistService.deletePlaylist(id);
        responseObject.put("message", "deleted");
        return new ResponseEntity<>(responseObject, HttpStatus.OK);
    }

    @RequestMapping(value = "/addVideo/{playlistId}/{videoId}", produces = "application/json", method = RequestMethod.POST)
    public ResponseEntity<PlaylistVideo> addVideoInPlaylist(@PathVariable("playlistId") Long playlistId, @PathVariable("videoId") String videoId, @CurrentUser UserPrincipal currentUser){
        PlaylistVideo playlistVideo = new PlaylistVideo();
        playlistVideo.setPlaylistId(playlistId);
        playlistVideo.setFavouriteVideoId(videoId);
        playlistVideo.setUserId(currentUser.getId());
        return new ResponseEntity<>(playlistVideoService.addVideoInPlaylist(playlistVideo), HttpStatus.CREATED);
    }

    @RequestMapping(value = "/deleteVideo/{playlistId}/{videoId}", produces = "application/json", method = RequestMethod.DELETE)
    public ResponseEntity<JSONObject> deleteVideoFromPlaylist(@PathVariable("playlistId") Long playlistId, @PathVariable("videoId") String videoId, @CurrentUser UserPrincipal currentUser){

        JSONObject responseObject = new JSONObject();
        PlaylistVideo playlistVideo = new PlaylistVideo();
        playlistVideo.setPlaylistId(playlistId);
        playlistVideo.setFavouriteVideoId(videoId);
        playlistVideo.setUserId(currentUser.getId());
        playlistVideoService.deleteVideoFromPlaylist(playlistVideo);
        responseObject.put("message", "deleted");
        return new ResponseEntity<>(responseObject, HttpStatus.OK);
    }

    @RequestMapping(value = "/getPlaylistByPlaylistId/{id}", produces = "application/json" , method = RequestMethod.GET)
    public ResponseEntity<List<String>> getPlaylistByPlaylistId(@PathVariable("id")Long id, @CurrentUser UserPrincipal currentUser){
        List<PlaylistVideo> list = playlistVideoRepository.findByPlaylistIdAndUserId(id, currentUser.getId());

        List<String> videos = new ArrayList<>();

        for (PlaylistVideo playlistVideo : list)
            videos.add(playlistVideo.getFavouriteVideoId());

        return new ResponseEntity<>(videos, HttpStatus.OK);
    }





}
