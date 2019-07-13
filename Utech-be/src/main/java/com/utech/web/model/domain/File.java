package com.utech.web.model.domain;

import javax.persistence.*;
import java.sql.Timestamp;


@Entity
@Table(name = "files")
public class File {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String extension;
    private String type;

    @Column(name = "created_at")
    private Timestamp createdAt;


}
