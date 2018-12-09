package ro.uTech.youtube.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ro.uTech.youtube.model.domain.Search;
import ro.uTech.youtube.repository.SearchRepository;

import java.util.List;


@Service
public class SearchService {

    @Autowired
    private SearchRepository searchRepository;


    public void saveSearch(String keyword, Long userId){

        Search search = new Search();
        search.setKeyword(keyword);
        search.setUserId(userId);

        searchRepository.save(search);
    }

    public List<Search> findAllSearches(Long userId){
        return searchRepository.findAllByUserId(userId);
    }
}
