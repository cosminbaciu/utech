package com.utech.web.controller;


import com.utech.web.security.CurrentUser;
import com.utech.web.security.UserPrincipal;
import com.google.api.client.googleapis.json.GoogleJsonResponseException;
import com.google.api.client.http.HttpRequest;
import com.google.api.client.http.HttpRequestInitializer;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.services.youtube.YouTube;
import com.google.api.services.youtube.model.SearchListResponse;
import com.google.api.services.youtube.model.SearchResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import com.utech.web.model.domain.Search;
import com.utech.web.security.SearchService;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Properties;

@Controller
@RequestMapping("/youtube")
public class SearchController {


    private static final String PROPERTIES_FILENAME = "application.properties";

    private static final long NUMBER_OF_VIDEOS_RETURNED = 25;

    @Autowired
    private SearchService searchService;


    @RequestMapping(value = "/search/{keyword}", produces = {"application/json"}, method = RequestMethod.GET)
    public ResponseEntity<List<SearchResult>> searchByKeyword(@PathVariable(value = "keyword") String keyword, @CurrentUser UserPrincipal activeUser){

        Properties properties = new Properties();
        try {
            InputStream in = YouTube.Search.class.getResourceAsStream("/" + PROPERTIES_FILENAME);
            properties.load(in);

        } catch (IOException e) {
            System.err.println("There was an error reading " + PROPERTIES_FILENAME + ": " + e.getCause()
                    + " : " + e.getMessage());
            System.exit(1);
        }

        try {

            YouTube youtube = new YouTube.Builder(new NetHttpTransport(), new JacksonFactory(), new HttpRequestInitializer() {
                public void initialize(HttpRequest request) throws IOException {
                }
            }).setApplicationName("youtube-cmdline-search-sample").build();

            YouTube.Search.List search = youtube.search().list("id,snippet");

            String apiKey = properties.getProperty("youtube.apikey");
            search.setKey(apiKey);
            search.setQ(keyword);
            search.setType("video");
            search.setFields("items(id/kind,id/videoId,snippet/title,snippet/thumbnails/default/url)");
            search.setMaxResults(NUMBER_OF_VIDEOS_RETURNED);

            searchService.saveSearch(keyword, activeUser.getId());

            SearchListResponse searchResponse = search.execute();
            List<SearchResult> searchResultList = searchResponse.getItems();
            if (searchResultList != null) {
                return new ResponseEntity<>(searchResultList, HttpStatus.OK);
            }
        } catch (GoogleJsonResponseException e) {
            System.err.println("There was a service error: " + e.getDetails().getCode() + " : "
                    + e.getDetails().getMessage());
        } catch (IOException e) {
            System.err.println("There was an IO error: " + e.getCause() + " : " + e.getMessage());
        } catch (Throwable t) {
            t.printStackTrace();
        }

        return null;
    }

    @RequestMapping(value = "/searchHistory", produces = "application/json", method = RequestMethod.GET)
    public ResponseEntity<List<Search>> getAllSearches(@CurrentUser UserPrincipal currentUser){
        return  new ResponseEntity<>(searchService.findAllSearches(currentUser.getId()), HttpStatus.OK);
    }



}
