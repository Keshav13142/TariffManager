package com.examly.springapp.Controllers;


import com.examly.springapp.Models.LoginModel;
import com.examly.springapp.Services.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
public class LoginController {
    
    @Autowired
    private LoginService loginService;
    @PostMapping("/login")
    public ResponseEntity<Boolean> checkUser(@RequestBody LoginModel login)
    {
        return new ResponseEntity<>(this.loginService.check(login),HttpStatus.OK);
    }

}
