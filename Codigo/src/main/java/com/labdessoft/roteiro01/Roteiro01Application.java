package com.labdessoft.roteiro01;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.labdessoft.roteiro01.repository")
public class Roteiro01Application {

	public static void main(String[] args) {
		SpringApplication.run(Roteiro01Application.class, args);
	}
}
