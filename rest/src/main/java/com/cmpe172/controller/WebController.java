package com.cmpe172.controller;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cmpe172.model.User;
import com.cmpe172.repository.UserRepository;

@RestController
public class WebController {

  @Autowired
  UserRepository repository;

  @RequestMapping("/delete")
  public String delete() {
    repository.deleteAll();
    return "Done";
  }

  @RequestMapping("/save")
  public String save() {
    // Save a single User
    repository.save(new User("ID-1", "John", "Smith"));

    // save a list of Users
    repository.saveAll(Arrays.asList(new User("ID-2", "Test", "User"), new User("ID-3", "Ryan", "Ly"),
        new User("ID-4", "Vincent", "Truong"), new User("ID-5", "Ahmed", "Darkazanli")));

    return "Done";
  }

  @RequestMapping("/findall")
  public String findAll() {
    String result = "";
    Iterable<User> users = repository.findAll();

    for (User user : users) {
      result += user.toString() + "<br>";
    }

    return result;
  }

  @RequestMapping("/findbyid")
  public String findById(@RequestParam("id") String id) {
    String result = "";
    result = repository.findById(id).toString();
    return result;
  }

  @RequestMapping("/findbylastname")
  public String fetchDataByLastName(@RequestParam("lastname") String lastName) {
    String result = "";

    for (User cust : repository.findByLastName(lastName)) {
      result += cust.toString() + "<br>";
    }

    return result;
  }
}