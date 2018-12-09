package ro.uTech.youtube.controller;


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
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import ro.uTech.security.model.CustomUserDetails;
import ro.uTech.security.service.UserRegistrationServiceSupport;
import ro.uTech.youtube.model.domain.Search;
import ro.uTech.youtube.service.SearchService;

import java.io.IOException;
import java.io.InputStream;
import java.util.Iterator;
import java.util.List;
import java.util.Properties;

@Controller
@RequestMapping("/youtube")
public class SearchController {


    private static final String PROPERTIES_FILENAME = "application.properties";

    private static final long NUMBER_OF_VIDEOS_RETURNED = 25;

    @Autowired
    private SearchService searchService;

    @Autowired
    private UserRegistrationServiceSupport userRegistrationServiceSupport;


    @RequestMapping(value = "/search/{keyword}", produces = {"application/json"}, method = RequestMethod.GET)
    public ResponseEntity<Iterator<SearchResult>> searchByKeyword(@PathVariable(value = "keyword") String keyword, @AuthenticationPrincipal CustomUserDetails activeUser){

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

            searchService.saveSearch(keyword, userRegistrationServiceSupport.getUserId(activeUser.getEmail()));

            SearchListResponse searchResponse = search.execute();
            List<SearchResult> searchResultList = searchResponse.getItems();
            if (searchResultList != null) {
                return new ResponseEntity<>(searchResultList.iterator(), HttpStatus.OK);
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
    public ResponseEntity<List<Search>> getAllSearches(@AuthenticationPrincipal CustomUserDetails activeUser){
        return  new ResponseEntity<>(searchService.findAllSearches(userRegistrationServiceSupport.getUserId(activeUser.getEmail())), HttpStatus.OK);
    }



}
