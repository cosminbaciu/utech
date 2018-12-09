package ro.uTech.youtube.model.domain;


import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "playlists_favourite_videos")
@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class, property = "id")
public class PlaylistVideo {

    private Long id;
    private Long playlistId;
    private Long FavouriteVideoId;
    private Long userId;

    @Id
    @Column(name = "id")
    @SequenceGenerator(name = "playlists_favourite_videos_id_seq",
            sequenceName = "playlists_favourite_videos_id_seq",
            allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE,
            generator = "playlists_favourite_videos_id_seq")
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Column(name = "playlist_id")
    public Long getPlaylistId() {
        return playlistId;
    }

    public void setPlaylistId(Long playlistId) {
        this.playlistId = playlistId;
    }

    @Column(name = "favourite_video_id")
    public Long getFavouriteVideoId() {
        return FavouriteVideoId;
    }

    public void setFavouriteVideoId(Long favouriteVideoId) {
        FavouriteVideoId = favouriteVideoId;
    }

    @Column(name = "user_id")
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

}
