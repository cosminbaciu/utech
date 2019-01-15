package com.utech.web.security;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.utech.web.model.domain.PlaylistVideo;
import com.utech.web.repository.PlaylistVideoRepository;

@Service
public class PlaylistVideoService {

    @Autowired
    private PlaylistVideoRepository playlistVideoRepository;

    public PlaylistVideo addVideoInPlaylist(PlaylistVideo playlistVideo){
        return playlistVideoRepository.save(playlistVideo);
    }

    public void deleteVideoFromPlaylist(PlaylistVideo playlistVideo){
        playlistVideoRepository.delete(playlistVideoRepository.findByPlaylistIdAndFavouriteVideoId(playlistVideo.getPlaylistId(), playlistVideo.getFavouriteVideoId()));
    }

}
