package com.examly.springapp;


import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

//import org.junit.Test;
import org.junit.jupiter.api.Test;

import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@AutoConfigureMockMvc
@RunWith(SpringRunner.class)
class SpringappApplicationTests {

	@Autowired
    private MockMvc mockMvc;
	
	@Test
	@Transactional
    public void BE_Add_Expense() throws Exception {
        String newExpense = "{\"expenseId\":\"EXID01\",\"billNumber\":\"02\",\"billImage\":\"image.com\",\"billCost\":\"150\",\"datedOn\":\"15.09.2021\",\"status\":\"active\",\"remark\":\"done\",\"claimedBy\":\"user1\"}";
        mockMvc.perform(MockMvcRequestBuilders.post("/expense")
		.contentType(MediaType.APPLICATION_JSON)
		.content(newExpense)
		.accept(MediaType.APPLICATION_JSON))
		.andExpect(status().isOk())
		.andReturn();
    }
	
	@Test
	@Transactional
    public void BE_Get_Expense() throws Exception {
	 	mockMvc.perform(MockMvcRequestBuilders.get("/expense")
		.contentType(MediaType.APPLICATION_JSON)
		.accept(MediaType.APPLICATION_JSON))
		.andExpect(status().isOk())
		.andExpect(MockMvcResultMatchers.jsonPath("$").isNotEmpty())
		.andReturn();
    }

	@Test
	@Transactional
    public void BE_Update_Expense() throws Exception {
        String newExpense = "{\"expenseId\":\"EXID01\",\"billNumber\":\"02\",\"billImage\":\"image.com\",\"billCost\":\"200\",\"datedOn\":\"15.09.2021\",\"status\":\"active\",\"remark\":\"done\",\"claimedBy\":\"user1\"}";
        mockMvc.perform(MockMvcRequestBuilders.put("/expense")
		.param("cartItemID","01")
		.contentType(MediaType.APPLICATION_JSON)
		.content(newExpense)
		.accept(MediaType.APPLICATION_JSON))
		.andExpect(status().isOk())
		.andReturn();
    }

	@Test
	@Transactional
    public void BE_Update_User() throws Exception {
        String newUser = "{\"email\":\"user1@gmail.com\",\"password\":\"User@123\",\"username\":\"User1\",\"mobileNumber\":\"9876543210\",\"active\":\"true\",\"role\":\"manager\"}";
        mockMvc.perform(MockMvcRequestBuilders.put("/admin/user")
		.param("email","user@gmail.com")
		.contentType(MediaType.APPLICATION_JSON)
		.content(newUser)
		.accept(MediaType.APPLICATION_JSON))
		.andExpect(status().isOk())
		.andReturn();
    }
	
}
