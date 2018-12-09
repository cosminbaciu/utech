package ro.uTech.youtube.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.PathVariable;
import ro.uTech.youtube.model.domain.FavouriteVideo;

import java.util.List;

public interface FavouriteVideoRepository extends JpaRepository<FavouriteVideo, Long> {

    List<FavouriteVideo> findAllByUserIdOrderByViewsDesc(@PathVariable("userId") Long userId);

    FavouriteVideo findByUserIdAndVideoId(@PathVariable("userId") Long userId, @PathVariable("videoId") String videoId);

    List<FavouriteVideo> findAllByUserIdAndFavouriteFlagOrderByViewsDesc(@PathVariable("userId") Long userId, @PathVariable("favouriteFlag") Boolean favouriteFlag);
}
