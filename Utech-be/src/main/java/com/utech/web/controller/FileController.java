package com.utech.web.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import ro.digital.deloitte.ats.dto.UploadFileResponse;
import ro.digital.deloitte.ats.enums.FileType;
import ro.digital.deloitte.ats.security.CurrentUser;
import ro.digital.deloitte.ats.security.UserPrincipal;
import ro.digital.deloitte.ats.service.FileStorageService;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
public class FileController {

    private static final Logger logger = LoggerFactory.getLogger(FileController.class);

    @Autowired
    private FileStorageService fileStorageService;

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

    @PostMapping("/uploadMultipleFiles")
    public List<UploadFileResponse> uploadMultipleFiles(@RequestParam("files") MultipartFile[] files, @CurrentUser UserPrincipal currentUser) {
        return Arrays.asList(files)
                .stream()
                .map(file -> uploadFile(file, currentUser))
                .collect(Collectors.toList());
    }


    @GetMapping("/downloadProfilePicture")
    public ResponseEntity<Resource> downloadProfilePicture(@CurrentUser UserPrincipal currentUser, HttpServletRequest request) {

        Resource resource = fileStorageService.loadProfilePicture(currentUser, FileType.PROFILE);

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

}
