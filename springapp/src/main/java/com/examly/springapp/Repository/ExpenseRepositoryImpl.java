package com.examly.springapp.Repository;

import javax.persistence.*;

import com.examly.springapp.Models.ExpenseModel;
import com.examly.springapp.Models.UserModel;

import org.springframework.stereotype.Component;
import java.util.List;

@Component
public class ExpenseRepositoryImpl {

    @PersistenceContext
    private EntityManager entityManager;

    @SuppressWarnings("unused")
    public Long findCurrentMonthExpenses(UserModel user) {
        String hql = "select sum(e.billCost) from ExpenseModel e where month(e.datedOn)=month(current_timestamp) and e.claimedBy=:user and e.status!='declined'";
        TypedQuery<Long> query = entityManager.createQuery(hql,Long.class);
        query.setParameter("user", user);
        return query.getSingleResult();
    }
    public List <ExpenseModel> getCurrentMonthExpenses(UserModel user) {
        String hql = "select e from ExpenseModel e where month(e.datedOn)=month(current_timestamp) and e.claimedBy=:user";
        TypedQuery <ExpenseModel> query = entityManager.createQuery(hql,ExpenseModel.class);
        query.setParameter("user", user);
        return query.getResultList();
    }
    public List <ExpenseModel> findExpenseByEmpId(UserModel user) {
        String hql = "select e from ExpenseModel e where  month(e.datedOn)=month(current_timestamp) and e.claimedBy=:user";
        TypedQuery <ExpenseModel> query = entityManager.createQuery(hql,ExpenseModel.class);
        query.setParameter("user", user);
        return query.getResultList();
    }
}
