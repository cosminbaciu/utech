package ro.uTech.youtube.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ro.uTech.youtube.model.domain.Playlist;

public interface PlaylistRepository extends JpaRepository<Playlist, Long> {

}
