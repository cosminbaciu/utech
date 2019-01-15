package com.utech.web.security;

import com.utech.web.repository.PlaylistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.utech.web.model.domain.Playlist;

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

        Playlist oldPlaylist = playlistRepository.findById(id).get();

        oldPlaylist.setName(playlist.getName());
        oldPlaylist.setGenre(playlist.getGenre());

        return playlistRepository.save(oldPlaylist);
    }

    public void deletePlaylist(Long id){
        playlistRepository.delete(playlistRepository.findById(id).get());
    }
}
