package ro.uTech.youtube.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import ro.uTech.youtube.model.domain.Playlist;
import ro.uTech.youtube.model.domain.PlaylistVideo;
import ro.uTech.youtube.service.PlaylistService;
import ro.uTech.youtube.service.PlaylistVideoService;

import javax.validation.Valid;
import java.util.List;

@Controller
@RequestMapping("/playlist")
public class PlaylistController {


    @Autowired
    private PlaylistService playlistService;

    @Autowired
    private PlaylistVideoService playlistVideoService;

    @RequestMapping(value = "/getAll", produces = "application/json", method = RequestMethod.GET)
    public ResponseEntity<List<Playlist>> getAllPlaylists(){
        return new ResponseEntity<>(playlistService.getAll(), HttpStatus.OK);
    }

    @RequestMapping(value = "/create", produces = "application/json", method = RequestMethod.POST)
    public ResponseEntity<Playlist> createPlaylist(@Valid @RequestBody Playlist playlist){
        return new ResponseEntity<>(playlistService.createPlaylist(playlist), HttpStatus.CREATED);
    }

    @RequestMapping(value = "/update/{id}", produces = "application/json", method = RequestMethod.PUT)
    public ResponseEntity<Playlist> updatePlaylist(@PathVariable("id")Long id, @Valid @RequestBody Playlist playlist){
        return new ResponseEntity<>(playlistService.updatePlaylist(id, playlist), HttpStatus.CREATED);
    }

    @RequestMapping(value = "/delete/{id}", produces = "application/json", method = RequestMethod.DELETE)
    public ResponseEntity<String> deletePlaylist(@PathVariable("id")Long id){
        playlistService.deletePlaylist(id);
        return new ResponseEntity<>("Deleted", HttpStatus.OK);
    }

    @RequestMapping(value = "/addVideo/{playlistId}/{videoId}", produces = "application/json", method = RequestMethod.POST)
    public ResponseEntity<PlaylistVideo> addVideoInPlaylist(@PathVariable("playlistId") Long playlistId, @PathVariable("videoId") Long videoId){
        PlaylistVideo playlistVideo = new PlaylistVideo();
        playlistVideo.setPlaylistId(playlistId);
        playlistVideo.setFavouriteVideoId(videoId);
        return new ResponseEntity<>(playlistVideoService.addVideoInPlaylist(playlistVideo), HttpStatus.CREATED);
    }

    @RequestMapping(value = "/deleteVideo/{playlistId}/{videoId}", produces = "application/json", method = RequestMethod.DELETE)
    public ResponseEntity<String> deleteVideoFromPlaylist(@PathVariable("playlistId") Long playlistId, @PathVariable("videoId") Long videoId){
        PlaylistVideo playlistVideo = new PlaylistVideo();
        playlistVideo.setPlaylistId(playlistId);
        playlistVideo.setFavouriteVideoId(videoId);
        playlistVideoService.deleteVideoFromPlaylist(playlistVideo);
        return new ResponseEntity<>("Deleted", HttpStatus.OK);
    }






}
