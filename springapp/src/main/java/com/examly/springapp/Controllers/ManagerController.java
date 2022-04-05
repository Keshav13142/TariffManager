package com.examly.springapp.Controllers;

import com.examly.springapp.Models.ExpenseModel;
import com.examly.springapp.Services.ExpenseService;
import com.examly.springapp.message.ResponseMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("*")

public class ManagerController {

    @Autowired
    private ExpenseService expenseService;
    @GetMapping("/manager")
    public ResponseEntity<List<ExpenseModel>> getExpense()
    {
         List<ExpenseModel> list= this.expenseService.findAll();
         return new ResponseEntity<>(list,HttpStatus.OK);
    }

    @PutMapping("/manager/expense/{email}")
    public ResponseEntity<ResponseMessage> expenseEditSave(@RequestBody ExpenseModel expense)
    {
         String result=this.expenseService.updateExpense(expense);
         return new ResponseEntity<>(new ResponseMessage(result),HttpStatus.OK);
    }

    @DeleteMapping("/manger/expense/{id}")
    public ResponseEntity<ResponseMessage> expenseDelete(@PathVariable String id)
    {
         this.expenseService.deleteExpense(id);
         return new ResponseEntity<>(new ResponseMessage("Expense deleted"),HttpStatus.OK);
    }
    
    @GetMapping("/manager/expense/{id}")
    public ResponseEntity<ExpenseModel> expenseEditData(@PathVariable String id) throws Exception
    {
         ExpenseModel expense= this.expenseService.findByExpenseId(id);
         return new ResponseEntity<>(expense,HttpStatus.OK);
    }    
}