package com.examly.springapp.Repository;


import javax.transaction.Transactional;

import com.examly.springapp.Models.ExpenseModel;
import com.examly.springapp.Models.UserModel;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
@Transactional
public interface ExpenseRepository extends JpaRepository<ExpenseModel, String> {

    ExpenseModel[] findExpenseByEmpId(UserModel user);
    Long findCurrentMonthExpenses(UserModel user);
    List <ExpenseModel> getCurrentMonthExpenses(UserModel user);
    ExpenseModel findExpenseByExpenseId(String expenseId);
	void deleteExpenseByClaimedBy(UserModel user);
}
