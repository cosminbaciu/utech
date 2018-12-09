package ro.uTech.youtube.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ro.uTech.youtube.model.domain.FavouriteVideo;
import ro.uTech.youtube.model.dto.FavouriteVideoDTO;
import ro.uTech.youtube.repository.FavouriteVideoRepository;

import java.util.List;

@Service
public class FavouriteVideoService {


    @Autowired
    private FavouriteVideoRepository favouriteVideoRepository;


    public FavouriteVideo addToFavourite(FavouriteVideoDTO favouriteVideoDTO, Long userId){

        FavouriteVideo favouriteVideo = mapFavouriteVideoDTOtoFavouriteVideo(favouriteVideoDTO);

        FavouriteVideo existingFavouriteVideo = favouriteVideoRepository.findByUserIdAndVideoId(userId, favouriteVideo.getVideoId());

        if(existingFavouriteVideo != null) {
            existingFavouriteVideo.setFavouriteFlag(true);
            return favouriteVideoRepository.save(existingFavouriteVideo);
        }

        else {
            favouriteVideo.setViews(0);
            favouriteVideo.setUserId(userId);
            favouriteVideo.setFavouriteFlag(true);
            return favouriteVideoRepository.save(favouriteVideo);
        }
    }

    public List<FavouriteVideo> findAllOrderedByNoOfViews(Long userId){
        return favouriteVideoRepository.findAllByUserIdOrderByViewsDesc(userId);
    }

    public List<FavouriteVideo> findFavouriteVideos(Long userId){
        return favouriteVideoRepository.findAllByUserIdAndFavouriteFlagOrderByViewsDesc(userId, true);
    }

    public FavouriteVideo addAViewForVideo(FavouriteVideoDTO favouriteVideoDTO, Long userId){

        FavouriteVideo favouriteVideo = mapFavouriteVideoDTOtoFavouriteVideo(favouriteVideoDTO);

        FavouriteVideo existingFavouriteVideo = favouriteVideoRepository.findByUserIdAndVideoId(userId, favouriteVideo.getVideoId());

        if(existingFavouriteVideo != null) {
            existingFavouriteVideo.setViews(existingFavouriteVideo.getViews() + 1);
            return favouriteVideoRepository.save(existingFavouriteVideo);
        }
        else{
            favouriteVideo.setViews(1);
            favouriteVideo.setUserId(userId);
            favouriteVideo.setFavouriteFlag(false);
            return favouriteVideoRepository.save(favouriteVideo);
        }
    }

    private FavouriteVideo mapFavouriteVideoDTOtoFavouriteVideo(FavouriteVideoDTO favouriteVideoDTO){

        FavouriteVideo favouriteVideo = new FavouriteVideo();
        favouriteVideo.setId(favouriteVideoDTO.getId());
        favouriteVideo.setTitle(favouriteVideoDTO.getTitle());
        favouriteVideo.setThumbnailUrl(favouriteVideoDTO.getThumbnailUrl());
        favouriteVideo.setVideoId(favouriteVideoDTO.getVideoId());

        return favouriteVideo;
    }
}
