package com.utech.web.security;

import com.utech.web.model.domain.Search;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.utech.web.repository.SearchRepository;

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
