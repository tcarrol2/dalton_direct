package com.hello.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.hello.manager.WorkOrderManager;
import com.hello.to.WorkOrderDetailsTO;



@RestController
@RequestMapping("/workorder")
public class WorkOrderFormController {

	@Autowired
	private WorkOrderManager workOrderManager;

	@RequestMapping(value="/saveworkorder",method=RequestMethod.POST)
	public void setWorkOrderDetails(@RequestBody WorkOrderDetailsTO workOrderDetails) {
		
		 workOrderManager.setWorkOrderDetails(workOrderDetails);
	}
	
	@RequestMapping(value="/workorders",method=RequestMethod.POST)
	public void getWorkOrders() {
		
		 workOrderManager.getWorkOrders();
	}
}