package com.hello.mappers;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.hello.to.PersonDetailsTO;

public class PersonDetailsMapper implements RowMapper<PersonDetailsTO> {

	@Override
	public PersonDetailsTO mapRow(ResultSet rs, int rowNum)
			throws SQLException {
		
		PersonDetailsTO detailsTO = new PersonDetailsTO();
		
		detailsTO.setPersonId(rs.getInt("PersonId"));
		detailsTO.setLastName(rs.getString("LastName"));
		detailsTO.setFirstName(rs.getString("FirstName"));
		detailsTO.setAddress(rs.getString("Address"));
		detailsTO.setCity(rs.getString("City"));

		return detailsTO;
	}

}
