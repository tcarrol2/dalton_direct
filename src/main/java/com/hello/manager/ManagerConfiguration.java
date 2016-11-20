package com.hello.manager;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ManagerConfiguration {

	@Bean(name="personManager")
	public PersonManager getPersonManager(){
		return new PersonManager();
	}
	
	@Bean(name="workOrderManager")
	public WorkOrderManager getWorkOrderManager(){
		return new WorkOrderManager();
	}
}
