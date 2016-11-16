package com.hello.dao;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import com.hello.to.PersonDetailsTO;

@Component
public class PersonDAO {

	private static final String GET_PERSON_DETAILS_BY_SOURCE_LOCATION_ID =
			"SELECT PERSONID," +
			"	 LASTNAME, " +
			"	 FIRSTNAME," +
			"	 ADDRESS,  " +
			"	 CITY  " +
			" FROM PERSONS" +
			" WHERE PERSONID = ?";

	@Autowired
	private JdbcTemplate jdbcTemplate;

	/**
	 * This method will retrieve all location details for the given source location id.
	 * @param sourceLocationId
	 * @return
	 */
	public List<PersonDetailsTO> getPersonDetailsBySourceLocationId(
			String personId) {
		
		List<PersonDetailsTO> detailsList = new ArrayList<PersonDetailsTO>();
		
		try{
			
			List<Map<String, Object>> rows = 
					this.jdbcTemplate.queryForList(GET_PERSON_DETAILS_BY_SOURCE_LOCATION_ID,
					new Object[] { personId });
			
			for (Map<String, Object> row : rows) {
				
				PersonDetailsTO detailsTO = new PersonDetailsTO();
				
				detailsTO.setPersonId((int)row.get("PERSONID"));
				detailsTO.setLastName((String)row.get("LASTNAME"));
				detailsTO.setFirstName((String)row.get("FIRSTNAME"));
				detailsTO.setAddress((String)row.get("ADDRESS"));
				detailsTO.setCity((String)row.get("CITY"));

				detailsList.add(detailsTO);
			}
			
		}
		catch (EmptyResultDataAccessException e) {
			return detailsList;
		}
		
		return detailsList;
	}

	
}
