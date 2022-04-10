package com.examly.springapp.Repository;


import javax.transaction.Transactional;

import com.examly.springapp.Models.ExpenseModel;
import com.examly.springapp.Models.UserModel;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
@Transactional
public interface ExpenseRepository extends JpaRepository<ExpenseModel, String> {

    @Query("select e from ExpenseModel e where  month(e.datedOn)=month(current_timestamp) and e.claimedBy=:user")
    ExpenseModel[] findExpenseByEmpId(@Param("user") UserModel user);

    @Query("select sum(e.billCost) from ExpenseModel e where month(e.datedOn)=month(current_timestamp) and e.claimedBy=:user and e.status!='declined'")
    Long findCurrentMonthExpenses(@Param("user") UserModel user);

    @Query("select e from ExpenseModel e where month(e.datedOn)=month(current_timestamp) and e.claimedBy=:user")
    List <ExpenseModel> getCurrentMonthExpenses(@Param("user") UserModel user);

    ExpenseModel findExpenseByExpenseId(String expenseId);

	void deleteExpenseByClaimedBy(UserModel user);
}
