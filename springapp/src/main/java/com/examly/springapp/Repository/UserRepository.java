package com.examly.springapp.Repository;

import com.examly.springapp.Models.UserModel;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserModel,String> {
    List<UserModel> getEmployeeList();
    UserModel findEmployeeByEmail(String email);
    
}
