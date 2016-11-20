package com.hello.dao;


import javax.sql.DataSource;

import org.apache.log4j.Logger;
import org.springframework.cloud.config.java.AbstractCloudConfig;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.context.annotation.Profile;

@Configuration
@Profile("cloud")
@Primary
public class DAOCloudConfiguration extends AbstractCloudConfig{

	private static final Logger logger = Logger.getLogger(DAOCloudConfiguration.class);
	
	@Bean(name = "dataSource")
	public DataSource dataSource() {
		logger.error("Loading cloud data source.");
		DataSource dataSource = connectionFactory().dataSource();
	    return dataSource;
	}
	
	@Bean(name = "personDAO")
	public PersonDAO getPersonDAO(){
		return new PersonDAO();
	}
	
	@Bean(name = "workOrderDAO")
	public WorkOrderDAO getWorkOrderDAO(){
		return new WorkOrderDAO();
	}
	
	
}
