package com.examly.springapp.Services;

import com.examly.springapp.Models.LoginModel;
import com.examly.springapp.Models.UserModel;
import com.examly.springapp.Repository.ExpenseRepository;
import com.examly.springapp.Repository.LoginRepository;
import com.examly.springapp.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
public class EmployeeService {
    @Autowired
    private ExpenseRepository expenseRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private LoginRepository loginRepository;
    public UserModel getEmployee(String email)
    {
        return this.userRepository.findEmployeeByEmail(email);
    }
    public List<UserModel> getEmp()
    {
        return this.userRepository.findAll();
    }
    public List<UserModel> getAllEmployees()
    {
        return this.userRepository.getEmployeeList();
    }
    public String updateEmployee(UserModel user){
       this.userRepository.save(user);
       return "Updated";
    }
    public String deleteEmployee(String email){
        UserModel user=this.userRepository.findEmployeeByEmail(email);
        this.loginRepository.deleteLoginByEmail(user.getEmail());
        this.expenseRepository.deleteExpenseByClaimedBy(user);
        this.userRepository.deleteById(email);
        return "Employee Deleted";
    }
    public UserModel getEmpById(String email){
        return this.userRepository.findEmployeeByEmail(email);
    }
    public String addEmployee(UserModel user)
    {
        this.userRepository.save(user);
        return "Employee Added";
    }
    public boolean checkEmp(String email)
    {
        return this.userRepository.existsById(email);
    }
}
