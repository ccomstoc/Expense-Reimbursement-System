package com.revature.Project1Backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EntityScan("com.revature.Project1Backend.Models")
@ComponentScan("com.revature.Project1Backend")
@EnableJpaRepositories("com.revature.Project1Backend.DAOs")
@SpringBootApplication
public class Project1BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(Project1BackendApplication.class, args);
	}

}
