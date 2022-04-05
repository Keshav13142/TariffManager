package com.examly.springapp.Controllers;

import com.examly.springapp.Models.UserModel;
import com.examly.springapp.Models.LoginModel;
import com.examly.springapp.Services.EmployeeService;
import com.examly.springapp.Services.LoginService;
import com.examly.springapp.message.ResponseMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Base64;
import java.util.List;
import java.util.Base64.Decoder;
import java.util.Base64.Encoder;

@RestController
@CrossOrigin("*")
public class AdminController {
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private LoginService loginService;

    @GetMapping("/admin")
    public ResponseEntity<List<UserModel>> getAllUsers() {
        List<UserModel> employees=this.employeeService.getAllEmployees();
        for(int i=0;i<employees.size();i++)
        {
            employees.get(i).setPassword(passDecoder(employees.get(i).getPassword()));
        }
        return new ResponseEntity<>(employees, HttpStatus.OK);
    }

    @GetMapping("/manager/emp")
    public ResponseEntity<List<UserModel>> getAllUser() {
        return new ResponseEntity<>(this.employeeService.getEmp(), HttpStatus.OK);
    }

    @GetMapping("/admin/{email}")
    public ResponseEntity<UserModel> getUser(@PathVariable String email) {
        UserModel user=this.employeeService.getEmpById(email);
        user.setPassword(passDecoder(user.getPassword()));
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PutMapping("/admin/{email}")
    public ResponseEntity<ResponseMessage> updateUser(@RequestBody UserModel user) {
        user.setPassword(passEncoder(user.getPassword()));
        this.employeeService.updateEmployee(user);
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage("Updated"));
    }
    @Transactional
    @DeleteMapping("/admin/{email}")
    public ResponseEntity<ResponseMessage> dUser(@PathVariable String email) {
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(this.employeeService.deleteEmployee(email)));
    }

    @PostMapping("/admin")
    public ResponseEntity<ResponseMessage> addUser(@RequestBody UserModel user) {
        if (this.employeeService.checkEmp(user.getEmail())) {
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED)
                    .body(new ResponseMessage("User Already Exists"));
        }
        LoginModel login = new LoginModel(user.getEmail(), passEncoder(user.getPassword()));
        this.loginService.add(login);
        user.setPassword(passEncoder(user.getPassword()));
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(this.employeeService.addEmployee(user)));
    }
    public String passEncoder(String password)
    {
        Encoder encoder=Base64.getEncoder();
        return encoder.encodeToString(password.getBytes());
    }
    public String passDecoder(String password)
    {
        Decoder decoder = Base64.getDecoder(); 
        return new String(decoder.decode(password));
    }
}
