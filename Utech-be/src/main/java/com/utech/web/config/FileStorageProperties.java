package com.utech.web.config;


import org.springframework.boot.context.properties.ConfigurationProperties;


@ConfigurationProperties(prefix = "file")
public class FileStorageProperties {

    private String uploadDirectory;
    private String uploadFileFormat;
    private String uploadDir;

    public String getUploadDir() {
        return uploadDir;
    }

    public void setUploadDir(String uploadDir) {
        this.uploadDir = uploadDir;
    }

    public String getUploadDirectory() {
        return uploadDirectory;
    }

    public void setUploadDirectory(String uploadDirectory) {
        this.uploadDirectory = uploadDirectory;
    }

    public String getUploadFileFormat() {
        return uploadFileFormat;
    }

    public void setUploadFileFormat(String uploadFileFormat) {
        this.uploadFileFormat = uploadFileFormat;
    }
}
