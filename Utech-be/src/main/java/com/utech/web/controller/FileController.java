package com.utech.web.controller;

import com.utech.web.model.FileType;
import com.utech.web.model.domain.FileSender;
import com.utech.web.model.dtos.UploadFileResponse;
import com.utech.web.repository.FileSenderRespository;
import com.utech.web.security.CurrentUser;
import com.utech.web.security.UserPrincipal;
import com.utech.web.service.FileStorageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;


import javax.servlet.http.HttpServletRequest;
import javax.websocket.server.PathParam;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class FileController {

    private static final Logger logger = LoggerFactory.getLogger(FileController.class);

    @Autowired
    private FileStorageService fileStorageService;

    @Autowired
    private FileSenderRespository fileSenderRespository;

    @PostMapping("/uploadProfilePicture")
    public UploadFileResponse uploadFile(@RequestParam("file") MultipartFile file, @CurrentUser UserPrincipal currentUser) {
        String fileName = fileStorageService.storeProfilePicture(file, FileType.PROFILE, currentUser);

        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/downloadFile/")
                .path(fileName)
                .toUriString();

        return new UploadFileResponse(fileName, fileDownloadUri,
                file.getContentType(), file.getSize());
    }

    @PostMapping("/uploadLessonPhoto")
    public UploadFileResponse uploadLessonPhoto(@RequestParam("name") String name, @RequestParam("file") MultipartFile file, @CurrentUser UserPrincipal currentUser) {
        String fileName = fileStorageService.storeLessonPhoto(name, file, FileType.PROFILE, currentUser);

        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/downloadFile/")
                .path(fileName)
                .toUriString();

        return new UploadFileResponse(fileName, fileDownloadUri,
                file.getContentType(), file.getSize());
    }

    @PostMapping(path ="/uploadMultipleFiles", consumes = "multipart/form-data")
    public List<UploadFileResponse> uploadMultipleFiles(@RequestParam("files") MultipartFile[] files, @CurrentUser UserPrincipal currentUser) {
        return Arrays.asList(files)
                .stream()
                .map(file -> uploadFile(file, currentUser))
                .collect(Collectors.toList());
    }

    @PostMapping(path ="/uploadMultipleFilesForLessons", consumes = "multipart/form-data")
    public List<UploadFileResponse> uploadMultipleFilesforLessons(@RequestParam("name") String name,@RequestParam("files") MultipartFile[] files, @CurrentUser UserPrincipal currentUser) {
        return Arrays.asList(files)
                .stream()
                .map(file -> uploadLessonPhoto(name, file, currentUser))
                .collect(Collectors.toList());
    }

    @PostMapping("/uploadTutoringFile")
    public UploadFileResponse uploadTutoringFile( @RequestParam("file") MultipartFile file, @CurrentUser UserPrincipal currentUser) {

        FileSender fileSender = new FileSender();
        fileSender.setFilename(file.getOriginalFilename());
        fileSenderRespository.save(fileSender);

        String fileName = fileStorageService.storeTutoringFiles(file, currentUser);

        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/downloadFile/")
                .path(fileName)
                .toUriString();

        return new UploadFileResponse(fileName, fileDownloadUri,
                file.getContentType(), file.getSize());
    }

    @PostMapping(path ="/uploadMultipleTutoringFiles", consumes = "multipart/form-data")
    public List<UploadFileResponse> uploadMultipleTutoringFiles(@RequestParam("files") MultipartFile[] files, @CurrentUser UserPrincipal currentUser) {
        return Arrays.asList(files)
                .stream()
                .map(file -> uploadTutoringFile(file, currentUser))
                .collect(Collectors.toList());
    }


    @GetMapping("/downloadProfilePicture/{username}/{fileName:.+}")
    public ResponseEntity<Resource> downloadProfilePicture(@PathVariable String username,@PathVariable String fileName,  HttpServletRequest request) {

        Resource resource = fileStorageService.loadProfilePicture(username, fileName, FileType.PROFILE);

        String contentType = null;
        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        } catch (IOException ex) {
            logger.info("Could not determine file type.");
        }

        if(contentType == null) {
            contentType = "application/octet-stream";
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .body(resource);
    }
//
//    @GetMapping("/downloadExternalProfilePicture/{fileName:.+}/{username")
//    public ResponseEntity<Resource> downloadExternalProfilePicture(@PathVariable String username,@PathVariable String fileName,  HttpServletRequest request) {
//
//        Resource resource = fileStorageService.loadProfilePicture(username, fileName, FileType.PROFILE);
//
//        String contentType = null;
//        try {
//            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
//        } catch (IOException ex) {
//            logger.info("Could not determine file type.");
//        }
//
//        if(contentType == null) {
//            contentType = "application/octet-stream";
//        }
//
//        return ResponseEntity.ok()
//                .contentType(MediaType.parseMediaType(contentType))
//                .body(resource);
//    }

    @GetMapping("/downloadLessonPhoto/{name}")
    public ResponseEntity<Resource> downloadProfilePicture(@PathVariable("name") String lessonName,  HttpServletRequest request) {

        Resource resource = fileStorageService.loadLessonPhoto(lessonName);

        String contentType = null;
        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        } catch (IOException ex) {
            logger.info("Could not determine file type.");
        }

        if(contentType == null) {
            contentType = "application/octet-stream";
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .body(resource);
    }

    @GetMapping("/downloadTutoringFile/{name}")
    public ResponseEntity<Resource> downloadTutoringFiles(@PathVariable("name") String filename) {


        Resource resource = fileStorageService.loadTutoringFiles(filename);




        String contentType = null;
//        try {
//            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
//        } catch (IOException ex) {
//            logger.info("Could not determine file type.");
//        }
//
        if(contentType == null) {
            contentType = "application/octet-stream";
        }

        HttpHeaders header = new HttpHeaders();
        header.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename);
        return ResponseEntity.ok()
                .headers(header)
                .contentType(MediaType.parseMediaType(contentType))
                .body(resource);
    }

    @GetMapping("/tutoring")
    public List<FileSender> getTutoingFiles(){
        return fileSenderRespository.findAll();
    }



}
