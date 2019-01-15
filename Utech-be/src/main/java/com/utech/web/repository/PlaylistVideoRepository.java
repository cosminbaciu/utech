package com.utech.web.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.PathVariable;
import com.utech.web.model.domain.PlaylistVideo;

import java.util.List;

public interface PlaylistVideoRepository extends JpaRepository<PlaylistVideo, Long> {

    PlaylistVideo findByPlaylistIdAndFavouriteVideoId(@PathVariable("playlistId") Long playlistId, @PathVariable("favouriteVideoId") String favouriteVideoId);
    List<PlaylistVideo> findByPlaylistId(@PathVariable("playlistId") Long id);
}
