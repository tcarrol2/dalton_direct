package com.hello.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import com.hello.to.WorkOrderDetailsTO;

@Component
public class WorkOrderDAO {

	private static final String INSERT_INTO_WORKORDERS =
					"INSERT INTO WORKORDERS "
					+ "            (INSTALLERONE, "
					+ "             INSTALLERTWO, "
					+ "             STARTINGDATE, "
					+ "             CUSTOMERNAME, "
					+ "             ADDRESS, "
					+ "             CITY, "
					+ "             STATE, "
					+ "             ZIP, "
					+ "             JOBPHONE, "
					+ "             ACCESSCODES, "
					+ "             JOBDESCRIPTION, "
					+ "             CELLONE, "
					+ "             CELLTWO, "
					+ "             CELLTHREE, "
					+ "             CELLFOUR, "
					+ "             TOTALCOST) "
					+ "VALUES      (?, "
					+ "             ?, "
					+ "             CURRENT_TIMESTAMP, "
					+ "             ?, "
					+ "             ?, "
					+ "             ?, "
					+ "             ?, "
					+ "             ?, "
					+ "             ?, "
					+ "             ?, "
					+ "             ?, "
					+ "             ?, "
					+ "             ?, "
					+ "             ?, "
					+ "             ?, "
					+ "             ?)";

	@Autowired
	private JdbcTemplate jdbcTemplate;

	public void insertWorkOrders(WorkOrderDetailsTO workOrderDetailsTO) {
		
		jdbcTemplate.update(
				INSERT_INTO_WORKORDERS,
                new Object[] { workOrderDetailsTO.getInstallerOne(), workOrderDetailsTO.getInstallerTwo(),
                		workOrderDetailsTO.getCustomerName(), workOrderDetailsTO.getAddress(),
                		workOrderDetailsTO.getCity(), workOrderDetailsTO.getState(),
                		workOrderDetailsTO.getZip(), workOrderDetailsTO.getJobPhone(), 
                		workOrderDetailsTO.getAccessCodes(), workOrderDetailsTO.getDescriptionOfWork(),
                		workOrderDetailsTO.getCellOne(), workOrderDetailsTO.getCellTwo(),
                		workOrderDetailsTO.getCellThree(), workOrderDetailsTO.getCellFour(),
                        workOrderDetailsTO.getTotalAmount() });
	}

	public List<WorkOrderDetailsTO> getWorkOrderDetailById(int workOrderId) {
		// TODO Auto-generated method stub
		return null;
	}

	
}
