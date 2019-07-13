package com.utech.web.model.domain;


import javax.persistence.*;

@Entity
@Table(name = "user_details")
public class UserDetails {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long userId;

}
