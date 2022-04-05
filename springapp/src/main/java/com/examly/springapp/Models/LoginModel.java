package com.examly.springapp.Models;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name = "Login")
public class LoginModel {
    @Id
    private String email;
    private String password;

    
    public LoginModel() {
    }
    public LoginModel(String email, String password) {
        this.email = email;
        this.password = password;

    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    
}
