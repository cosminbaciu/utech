package com.utech.web.repository;

import com.utech.web.model.domain.FavouriteVideo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

public interface FavouriteVideoRepository extends JpaRepository<FavouriteVideo, Long> {

    List<FavouriteVideo> findAllByUserIdOrderByViewsDesc(@PathVariable("userId") Long userId);

    FavouriteVideo findByUserIdAndVideoId(@PathVariable("userId") Long userId, @PathVariable("videoId") String videoId);

    List<FavouriteVideo> findAllByUserIdAndFavouriteFlagOrderByViewsDesc(@PathVariable("userId") Long userId, @PathVariable("favouriteFlag") Boolean favouriteFlag);
}
