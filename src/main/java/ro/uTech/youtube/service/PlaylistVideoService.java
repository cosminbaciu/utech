package ro.uTech.youtube.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ro.uTech.youtube.model.domain.PlaylistVideo;
import ro.uTech.youtube.repository.PlaylistVideoRepository;

@Service
public class PlaylistVideoService {

    @Autowired
    private PlaylistVideoRepository playlistVideoRepository;

    public PlaylistVideo addVideoInPlaylist(PlaylistVideo playlistVideo){
        return playlistVideoRepository.save(playlistVideo);
    }

    public void deleteVideoFromPlaylist(PlaylistVideo playlistVideo){
        playlistVideoRepository.delete(playlistVideoRepository.findByPlaylistIdAndFavouriteVideoId(playlistVideo.getPlaylistId(), playlistVideo.getFavouriteVideoId()).getId());
    }

}
