package com.hello.dao;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
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
	
	String GET_ALL_WORKORDERS = "SELECT WORKORDERID, "
			+ "       INSTALLERONE, "
			+ "       INSTALLERTWO, "
			+ "       STARTINGDATE, "
			+ "       CUSTOMERNAME, "
			+ "       ADDRESS, "
			+ "       CITY, "
			+ "       STATE, "
			+ "       ZIP, "
			+ "       JOBPHONE, "
			+ "       ACCESSCODES, "
			+ "       JOBDESCRIPTION, "
			+ "       CELLONE, "
			+ "       CELLTWO, "
			+ "       CELLTHREE, "
			+ "       CELLFOUR, "
			+ "       TOTALCOST "
			+ "FROM   WORKORDERS;";

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

	public List<WorkOrderDetailsTO> getWorkOrders() {
		
		List<WorkOrderDetailsTO> workOrdersList = new ArrayList<WorkOrderDetailsTO>();
		
		try{
			
			List<Map<String, Object>> rows = 
					this.jdbcTemplate.queryForList(GET_ALL_WORKORDERS);
			
			for (Map<String, Object> row : rows) {
				
				WorkOrderDetailsTO detailsTO = new WorkOrderDetailsTO();
				
				detailsTO.setInstallerOne((String)row.get("INSTALLERONE"));
				detailsTO.setInstallerOne((String)row.get("INSTALLERTWO"));
				detailsTO.setStartingDate((Date)row.get("STARTINGDATE"));
				detailsTO.setCustomerName((String)row.get("CUSTOMERNAME"));
				detailsTO.setAddress((String)row.get("ADDRESS"));
				detailsTO.setCity((String)row.get("CITY"));
				detailsTO.setState((String)row.get("STATE"));
				detailsTO.setZip((String)row.get("ZIP"));
				detailsTO.setJobPhone((String)row.get("JOBPHONE"));
				detailsTO.setAccessCodes((String)row.get("ACCESSCODES"));
				detailsTO.setDescriptionOfWork((String)row.get("JOBDESCRIPTION"));
				detailsTO.setCellOne((String)row.get("CELLONE"));
				detailsTO.setCellTwo((String)row.get("CELLTWO"));
				detailsTO.setCellThree((String)row.get("CELLTHREE"));
				detailsTO.setCellFour((String)row.get("CELLFOUR"));
				detailsTO.setTotalAmount((double)row.get("TOTALCOST"));

				workOrdersList.add(detailsTO);
			}
			
		}
		catch (EmptyResultDataAccessException e) {
			return workOrdersList;
		}
		
		return workOrdersList;
	}

	
}
