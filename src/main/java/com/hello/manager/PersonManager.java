package com.hello.manager;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.hello.dao.PersonDAO;
import com.hello.to.PersonDetailsTO;

public class PersonManager {

	@Autowired
	private PersonDAO personDAO;
	
	public List<PersonDetailsTO> getPersonDetailsBySourceLocationId(String sourceLocationId) {
		return personDAO.getPersonDetailsBySourceLocationId(sourceLocationId);
	}
}
