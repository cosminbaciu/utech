package com.utech.web.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.utech.web.model.domain.Playlist;

public interface PlaylistRepository extends JpaRepository<Playlist, Long> {

}
