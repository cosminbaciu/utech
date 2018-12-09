package ro.uTech.youtube.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ro.uTech.youtube.model.domain.Playlist;
import ro.uTech.youtube.repository.PlaylistRepository;

import java.util.List;

@Service
public class PlaylistService {

    @Autowired
    private PlaylistRepository playlistRepository;

    public List<Playlist> getAll(){
        return  playlistRepository.findAll();
    }


    public Playlist createPlaylist(Playlist playlist){
        return playlistRepository.save(playlist);
    }

    public Playlist updatePlaylist(Long id, Playlist playlist){

        Playlist oldPlaylist = playlistRepository.findOne(id);

        oldPlaylist.setName(playlist.getName());
        oldPlaylist.setGenre(playlist.getGenre());
        oldPlaylist.setUpdatedAt(playlist.getUpdatedAt());

        return playlistRepository.save(oldPlaylist);
    }

    public void deletePlaylist(Long id){
        playlistRepository.delete(id);
    }
}
