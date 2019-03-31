package com.utech.web.controller;


import com.utech.web.model.domain.Category;
import com.utech.web.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;

@Controller
@RequestMapping("api/categories")
public class CategoryController {

    @Autowired
    private CategoryRepository categoryRepository;

    @RequestMapping (value = "/addCategory", produces = "application/json", method = RequestMethod.POST)
    public ResponseEntity<Category > addCategory(@RequestBody Category category){

        return new ResponseEntity<>(categoryRepository.save(category), HttpStatus.CREATED);
    }

    @RequestMapping (value = "/getAllCategories", produces = "application/json", method = RequestMethod.GET)
    public ResponseEntity<List<Category>> getAllCategories(){
        return new ResponseEntity<>(categoryRepository.findAll(), HttpStatus.OK);
    }



}
