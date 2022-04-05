package com.examly.springapp;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
@SpringBootApplication
@EnableAutoConfiguration
public class SpringappApplication implements CommandLineRunner {
	public static void main(String[] args) {
		SpringApplication.run(SpringappApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		System.out.println("program is running");
	}

}
