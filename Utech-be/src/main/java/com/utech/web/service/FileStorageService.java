package com.utech.web.service;


import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import ro.digital.deloitte.ats.enums.FileType;
import ro.digital.deloitte.ats.exception.AppException;
import ro.digital.deloitte.ats.exception.FileStorageException;
import ro.digital.deloitte.ats.exception.IncorrectFileFormatException;
import ro.digital.deloitte.ats.exception.MyFileNotFoundException;
import ro.digital.deloitte.ats.security.UserPrincipal;
import ro.digital.deloitte.ats.utils.FileStorageProperties;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Objects;


/**
 * @author rdafinoiu
 * 2019-06-11
 */


@Service
public class FileStorageService {

    private final Path fileStorageLocation;
    private final String fileNameFormat;

    @Autowired
    public FileStorageService(FileStorageProperties fileStorageProperties) {
        this.fileStorageLocation = Paths.get(System.getProperty("user.dir") + fileStorageProperties.getUploadDirectory())
                .toAbsolutePath().normalize();
        this.fileNameFormat = fileStorageProperties.getUploadFileFormat();
        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            throw new AppException("Could not create the directory where the uploaded files will be stored.", ex);
        }
    }

    public String storeFile(MultipartFile file, String filename) {
        String newFullFilename = getFilename(filename, StringUtils.cleanPath(file.getOriginalFilename()));
        try {
            Path targetLocation = this.fileStorageLocation.resolve(newFullFilename);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
            return newFullFilename;
        } catch (IOException ex) {
            throw new AppException("Could not store file " + newFullFilename + ". Please try again!", ex);
        }
    }

    public Resource loadFileAsResource(String fileName) {
        try {
            Path filePath = this.fileStorageLocation.resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            if (resource.exists()) {
                return resource;
            } else {
                throw new AppException("File not found " + fileName);
            }
        } catch (MalformedURLException ex) {
            throw new AppException("File not found " + fileName, ex);
        }
    }

    private String getFilename(String newFilename, String originalFileName) {
        String fileExtension = FilenameUtils.getExtension(originalFileName);
        return String.format(fileNameFormat, newFilename, fileExtension);
    }

    public String storeProfilePicture(MultipartFile file, FileType fileType, UserPrincipal currentUser) {

        File folder = new File(this.fileStorageLocation.toString() + "/" + currentUser.getUsername());
        if (!folder.exists()) {
            if (folder.mkdir()) {
                System.out.println("Directory is created!");
            } else {
                System.out.println("Failed to create directory!");
            }
        }

        String reverse = new StringBuilder(Objects.requireNonNull(file.getOriginalFilename())).reverse().toString();
        String extensionReverse = Objects.requireNonNull(reverse.split("\\."))[0];
        String extension = new StringBuilder(extensionReverse).reverse().toString();



        String fileName = null;

        if( fileType.equals(FileType.PROFILE))
            if(extension.equals("jpg") || extension.equals("png"))
                fileName = "profile." + extension;
            else throw new IncorrectFileFormatException("Extension is not jpg or png");


        try {
            if(fileName.contains("..")) {
                throw new FileStorageException("Sorry! Filename contains invalid path sequence " + fileName);
            }

            Path targetLocation = Paths.get(this.fileStorageLocation.toString() + "/" + currentUser.getUsername()).resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            String fileNameWithoutExt = FilenameUtils.removeExtension(fileName);

            if(extension.equals("jpg"))
                new File(this.fileStorageLocation.toString() + "/" + currentUser.getUsername() + "/" + fileNameWithoutExt + ".png").delete();
            else if(extension.equals("png"))
                new File(this.fileStorageLocation.toString() + "/" + currentUser.getUsername() + "/" + fileNameWithoutExt + ".jpg").delete();

            return fileName;
        } catch (IOException ex) {
            throw new FileStorageException("Could not store file " + fileName + ". Please try again!", ex);
        }
    }

    public Resource loadProfilePicture(UserPrincipal userPrincipal, FileType filetype) {

        try {
            Path filePath = Paths.get(this.fileStorageLocation.toString() + "/"
                    + userPrincipal.getUsername()).resolve("profile.jpg").normalize();
            Resource resource = new UrlResource(filePath.toUri());
            if(resource.exists()) {
                return resource;
            } else {

                filePath = Paths.get(this.fileStorageLocation.toString() + "/"
                        + userPrincipal.getUsername()).resolve("profile.png").normalize();
                resource = new UrlResource(filePath.toUri());
                if (resource.exists()) {
                    return resource;
                } else
                    throw new MyFileNotFoundException("File not found " + "profile.png");

            }
        } catch (MalformedURLException ex) {
            throw new MyFileNotFoundException("File not found ", ex);
        }
    }
}
