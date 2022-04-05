package com.examly.springapp.Services;

import com.examly.springapp.Models.ExpenseModel;
import com.examly.springapp.Models.UserModel;
import com.examly.springapp.Repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.io.IOException;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ExpenseService {
    
    @Autowired
    private ExpenseRepository expenseRepository;
    public List<ExpenseModel> findAll(){
        return this.expenseRepository.findAll();
    }
    public ExpenseModel[] findById(UserModel user)
    {
        return this.expenseRepository.findExpenseByEmpId(user);
    }
    public String deleteExpense(String id)
    {
        if(this.expenseRepository.existsById((id)))
        {
            this.expenseRepository.deleteById(id);
            return "Expense Deleted";
        }
        return "File doesn't exist";
        
    }
    public String updateExpense(ExpenseModel expense)
    {
        this.expenseRepository.save(expense);
        return "Expense Updated";
    }
    public void addExpense(ExpenseModel expense,MultipartFile file) throws IOException
    {
        expense.setBillImage(file.getBytes());
        this.expenseRepository.save(expense);
    }
    public Long getSumOfExpenses(UserModel user)
    {
        return this.expenseRepository.findCurrentMonthExpenses(user);
    }
    public List <ExpenseModel> getCurrentExpense(UserModel user)
    {
        return this.expenseRepository.getCurrentMonthExpenses(user);
    }
    public ExpenseModel findByExpenseId(String expenseId) {
        return this.expenseRepository.findExpenseByExpenseId(expenseId);
    }
    public ExpenseModel addExpenseTest(ExpenseModel expenseModel) {
        return this.expenseRepository.save(expenseModel);
    }
}
