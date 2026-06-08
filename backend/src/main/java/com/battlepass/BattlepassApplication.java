package com.battlepass;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.battlepass")
public class BattlepassApplication {
	public static void main(String[] args) {
		SpringApplication.run(BattlepassApplication.class, args);
	}
}
