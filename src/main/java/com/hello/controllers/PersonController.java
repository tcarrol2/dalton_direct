package com.hello.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.hello.manager.PersonManager;
import com.hello.to.PersonDetailsTO;



@RestController
@RequestMapping("/person")
public class PersonController {

	@Autowired
	private PersonManager personManager;
	
	@RequestMapping(value="/sourceLocationId/{id}",method=RequestMethod.GET)
	public List<PersonDetailsTO> 
				getPersonDetailsBySourceLocationId(@PathVariable("id") String sourceLocationId) {
		
		return personManager.getPersonDetailsBySourceLocationId(sourceLocationId);
	}
}
