package com.hello.dao;


import javax.sql.DataSource;

import org.apache.commons.dbcp.BasicDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;
import org.springframework.core.env.Environment;

@Configuration
@PropertySource("classpath:/db.properties")
public class DAOConfiguration{

	@Autowired
	private Environment environment;

	@Bean(name = "dataSource")
	public DataSource getDataSource() throws Exception {
		
		BasicDataSource dataSource = new BasicDataSource();
		dataSource.setDriverClassName(environment
				.getProperty("app.driver-class-name"));
		dataSource.setUrl(environment.getProperty("app.url"));
		dataSource.setUsername(environment.getProperty("app.username"));
		dataSource.setPassword(environment.getProperty("app.password"));
		
		dataSource.setDefaultAutoCommit(true);
		dataSource.setMaxActive(30);

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
	
	@Bean
	public static PropertySourcesPlaceholderConfigurer placeHolderConfigurer() {
		return new PropertySourcesPlaceholderConfigurer();
	}
	
}
