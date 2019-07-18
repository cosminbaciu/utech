package com.utech.web.service;


import com.utech.web.config.FileStorageProperties;
import com.utech.web.exception.AppException;
import com.utech.web.exception.FileStorageException;
import com.utech.web.exception.IncorrectFileFormatException;
import com.utech.web.exception.MyFileNotFoundException;
import com.utech.web.model.FileType;
import com.utech.web.security.UserPrincipal;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Objects;


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

    public String storeTutoringFiles(MultipartFile file, UserPrincipal currentUser) {

        File folder = new File(this.fileStorageLocation.toString() + "/tutoring");
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



        String fileName = file.getOriginalFilename();


        try {
            if(fileName.contains("..")) {
                throw new FileStorageException("Sorry! Filename contains invalid path sequence " + fileName);
            }

            Path targetLocation = Paths.get(this.fileStorageLocation.toString() +  "/tutoring").resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

//            String fileNameWithoutExt = FilenameUtils.removeExtension(fileName);

//            if(extension.equals("jpg"))
//                new File(this.fileStorageLocation.toString() + "/" + lessonName + "/" + fileNameWithoutExt + ".png").delete();
//            else if(extension.equals("png"))
//                new File(this.fileStorageLocation.toString() + "/" + currentUser.getUsername() + "/" + fileNameWithoutExt + ".jpg").delete();

            return fileName;
        } catch (IOException ex) {
            throw new FileStorageException("Could not store file " + fileName + ". Please try again!", ex);
        }
    }

    public String storeLessonPhoto(String name, MultipartFile file, FileType fileType, UserPrincipal currentUser) {

        File folder = new File(this.fileStorageLocation.toString() + "/lessons");
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

            if(extension.equals("jpg") || extension.equals("png"))
                fileName = name + "." + extension;
            else throw new IncorrectFileFormatException("Extension is not jpg or png");


        try {
            if(fileName.contains("..")) {
                throw new FileStorageException("Sorry! Filename contains invalid path sequence " + fileName);
            }

            Path targetLocation = Paths.get(this.fileStorageLocation.toString() + "/lessons").resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            String fileNameWithoutExt = FilenameUtils.removeExtension(fileName);

            if(extension.equals("jpg"))
                new File(this.fileStorageLocation.toString() + "/lessons" + "/" + fileNameWithoutExt + ".png").delete();
            else if(extension.equals("png"))
                new File(this.fileStorageLocation.toString() + "/lessons" + "/" + fileNameWithoutExt + ".jpg").delete();

            return fileName;
        } catch (IOException ex) {
            throw new FileStorageException("Could not store file " + fileName + ". Please try again!", ex);
        }
    }

    public Resource loadProfilePicture(String username, String filename, FileType filetype) {

        try {
            Path filePath = Paths.get(this.fileStorageLocation.toString() + "/"
                    + username).resolve(filename).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            if(resource.exists()) {
                return resource;
            } else {

                filePath = Paths.get(this.fileStorageLocation.toString() + "/"
                        + username).resolve("profile.jpg").normalize();
                resource = new UrlResource(filePath.toUri());
                if (resource.exists()) {
                    return resource;
                } else
                    throw new MyFileNotFoundException("File not found " + "profile.jpg");

            }
        } catch (MalformedURLException ex) {
            throw new MyFileNotFoundException("File not found ", ex);
        }
    }

    public Resource loadLessonPhoto(String lessonName) {

        try {
            Path filePath = Paths.get(this.fileStorageLocation.toString() + "/lessons").resolve(lessonName + ".jpg").normalize();
            Resource resource = new UrlResource(filePath.toUri());
            if(resource.exists()) {
                return resource;
            } else {

                filePath = Paths.get(this.fileStorageLocation.toString() + "/lessons").resolve(lessonName + ".jpg").normalize();
                resource = new UrlResource(filePath.toUri());
                if (resource.exists()) {
                    return resource;
                } else
                    throw new MyFileNotFoundException("File not found " + lessonName);

            }
        } catch (MalformedURLException ex) {
            throw new MyFileNotFoundException("File not found ", ex);
        }
    }

    public Resource loadTutoringFiles(String filename) {



        try {
            Path filePath = Paths.get(this.fileStorageLocation.toString() + "/tutoring" ).resolve(filename).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            if(resource.exists()) {
                return resource;
            } else {

                filePath = Paths.get(this.fileStorageLocation.toString() + "/tutoring").resolve(filename).normalize();
                resource = new UrlResource(filePath.toUri());
                if (resource.exists()) {
                    return resource;
                } else
                    throw new MyFileNotFoundException("File not found " + filename);

            }
        } catch (MalformedURLException ex) {
            throw new MyFileNotFoundException("File not found ", ex);
        }
    }
}
