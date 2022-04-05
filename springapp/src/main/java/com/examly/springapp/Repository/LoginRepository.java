package com.examly.springapp.Repository;

import com.examly.springapp.Models.LoginModel;

import org.springframework.data.jpa.repository.JpaRepository;

public interface LoginRepository extends JpaRepository<LoginModel,String> {

    public LoginModel findByEmail(String email);

    public void deleteLoginByEmail(String email);
    
}
