package com.examly.springapp.Repository;

import javax.persistence.*;
import java.util.List;
import com.examly.springapp.Models.UserModel;
import org.springframework.stereotype.Component;

@Component
public class UserRepositoryImpl {

    @PersistenceContext
    private EntityManager entityManager;

    @SuppressWarnings("unused")
    public List<UserModel> getEmployeeList() {
        String hql = "select u from UserModel u where u.role<>'admin'";
        TypedQuery<UserModel> query = entityManager.createQuery(hql,UserModel.class);
        return query.getResultList();
    }
}
