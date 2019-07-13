package com.utech.web.model.dtos;

public class MultipartFileDTO {

    private org.springframework.web.multipart.MultipartFile[] files;

    public org.springframework.web.multipart.MultipartFile[] getFiles() {
        return files;
    }

    public void setFiles(org.springframework.web.multipart.MultipartFile[] files) {
        this.files = files;
    }
}
