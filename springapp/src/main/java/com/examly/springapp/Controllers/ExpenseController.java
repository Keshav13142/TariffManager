package com.examly.springapp.Controllers;

import com.examly.springapp.Models.ExpenseModel;
import com.examly.springapp.Models.UserModel;
import com.examly.springapp.Services.EmployeeService;
import com.examly.springapp.Services.ExpenseService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.examly.springapp.message.ResponseMessage;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.List;

@RestController
@CrossOrigin("*")
public class ExpenseController {
     @Autowired
     private ExpenseService expenseService;
     @Autowired
     private EmployeeService employeeService;

     @GetMapping("/expense")
     public ResponseEntity<List<ExpenseModel>> getExpese() {
          List<ExpenseModel> list = this.expenseService.findAll();
          return new ResponseEntity<>(list, HttpStatus.OK);
     }

     @GetMapping("/expense/{email}")
     public ResponseEntity<ExpenseModel[]> expenseEditData(@PathVariable String email) throws Exception {
          UserModel user = this.employeeService.getEmpById(email);
          ExpenseModel[] expense = this.expenseService.findById(user);
          return new ResponseEntity<>(expense, HttpStatus.OK);
     }

     @PostMapping("/expense")
     public ExpenseModel expenseSave(@RequestBody ExpenseModel expenseModel) {
           return this.expenseService.addExpenseTest(expenseModel);
     }
     @PostMapping("/expense/v1")
     public ResponseEntity<ResponseMessage> expenseSave(@RequestParam("expense") String exp,
               @RequestParam("file") MultipartFile file) throws JsonMappingException, JsonProcessingException {
          String message;
          ExpenseModel expense = new ObjectMapper().readValue(exp, ExpenseModel.class);
          try {
               this.expenseService.addExpense(expense, file);
               message = "Expense Added";
               return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));
          } catch (Exception e) {
               message = "Could not upload the file!";
               return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
          }
     }

     @PutMapping("/expense/{email}")
     public ResponseEntity<ResponseMessage> expenseEditSave(@RequestBody ExpenseModel expense) {
          String result = this.expenseService.updateExpense(expense);
          return new ResponseEntity<>(new ResponseMessage(result), HttpStatus.OK);
     }

     @GetMapping("/expense/sum-month/{email}")
     public ResponseEntity<Long> sumOfExpenses(@PathVariable String email) {
          UserModel user = this.employeeService.getEmpById(email);
          return new ResponseEntity<>(this.expenseService.getSumOfExpenses(user), HttpStatus.OK);
     }

     @GetMapping("/expense/curr-month/{email}")
     public ResponseEntity<List<ExpenseModel>> currentMonthExpense(@PathVariable String email) {
          UserModel user = this.employeeService.getEmpById(email);
          return new ResponseEntity<>(this.expenseService.getCurrentExpense(user), HttpStatus.OK);
     }
}
