package com.hello.manager;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.hello.dao.WorkOrderDAO;
import com.hello.to.WorkOrderDetailsTO;

public class WorkOrderManager {

	@Autowired
	private WorkOrderDAO workOrderDAO;
	
	public List<WorkOrderDetailsTO> getWorkOrders() {
		return workOrderDAO.getWorkOrders();
	}
	
	public Object setWorkOrderDetails(WorkOrderDetailsTO workOrderDetailsTO) {
		 workOrderDAO.insertWorkOrders(workOrderDetailsTO);
		 
		 return 1;
	}
}
