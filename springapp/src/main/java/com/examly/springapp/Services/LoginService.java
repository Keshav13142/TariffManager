package com.examly.springapp.Services;

import javax.transaction.Transactional;
import java.util.Base64;
import java.util.Base64.Decoder;
import com.examly.springapp.Models.LoginModel;
import com.examly.springapp.Repository.LoginRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
@Transactional
public class LoginService {
    
    @Autowired
    private LoginRepository loginRepository;
    public Boolean check(LoginModel login)
    {
        LoginModel local=this.loginRepository.findByEmail(login.getEmail());
        if(local!=null)
        {
            Decoder decoder = Base64.getDecoder();
            String dec= new String(decoder.decode(local.getPassword()));
            if(dec.equals(login.getPassword()))
            {
                return true;
            }
            return false;
        }
        return false;
    }
    public void add(LoginModel login)
    {
        this.loginRepository.save(login);
    }
    public LoginModel getLogin(String email)
    {
        return this.loginRepository.findByEmail(email);
    }
}
