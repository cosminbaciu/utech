package ro.uTech.youtube.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.PathVariable;
import ro.uTech.youtube.model.domain.PlaylistVideo;

public interface PlaylistVideoRepository extends JpaRepository<PlaylistVideo, Long> {

    PlaylistVideo findByPlaylistIdAndFavouriteVideoId(@PathVariable("playlistId")Long playlistId, @PathVariable("favouriteVideoId") Long favouriteVideoId);
}
