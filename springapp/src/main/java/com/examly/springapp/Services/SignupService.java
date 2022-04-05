package com.examly.springapp.Services;


import com.examly.springapp.Models.UserModel;
import com.examly.springapp.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SignupService {
    
    @Autowired
    private UserRepository userRepository;
    public Boolean addUser(UserModel user)
    {
        UserModel local=this.userRepository.findEmployeeByEmail(user.getEmail());
        if(local!=null)
        {
            return false; 
        }
        this.userRepository.save(user);
        return true;
    }
    public UserModel getUser(String email)
    {
        return this.userRepository.findEmployeeByEmail(email);
    }
}
