package com.examly.springapp.Controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WelcomeControlller {


    @RequestMapping("/")
    public String welcomeMessage()
    {
        return "Hello and welcome to Spring Boot";
    }
    @RequestMapping("/madhu")
    public String madhu()
    {
        return "My name is Madhu Amarath";
    }

}
