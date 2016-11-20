package com.hello.to;

import java.io.Serializable;
import java.util.Date;

public class WorkOrderDetailsTO implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String installerOne;
	private String installerTwo;
	private Date startingDate;
	private String customerName;
	private String address;
	private String state;
	private String city;
	private String zip;
	private String jobPhone;
	private String accessCodes;
	private String descriptionOfWork;
	private String cellOne;
	private String cellTwo;
	private String cellThree;
	private String cellFour;
	private String cellFive;
	private String cellSix;
	private String totalAmount;
	
	public String getInstallerOne() {
		return installerOne;
	}
	public void setInstallerOne(String installerOne) {
		this.installerOne = installerOne;
	}
	public String getInstallerTwo() {
		return installerTwo;
	}
	public void setIstallerTwo(String installerTwo) {
		this.installerTwo = installerTwo;
	}
	public Date getStartingDate() {
		return startingDate;
	}
	public void setStartingDate(Date startingDate) {
		this.startingDate = startingDate;
	}
	public String getCustomerName() {
		return customerName;
	}
	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getZip() {
		return zip;
	}
	public void setZip(String zip) {
		this.zip = zip;
	}
	public String getJobPhone() {
		return jobPhone;
	}
	public void setJobPhone(String jobPhone) {
		this.jobPhone = jobPhone;
	}
	public String getAccessCodes() {
		return accessCodes;
	}
	public void setAccessCodes(String accessCodes) {
		this.accessCodes = accessCodes;
	}
	public String getDescriptionOfWork() {
		return descriptionOfWork;
	}
	public void setDescriptionOfWork(String descriptionOfWork) {
		this.descriptionOfWork = descriptionOfWork;
	}
	public String getCellOne() {
		return cellOne;
	}
	public void setCellOne(String cellOne) {
		this.cellOne = cellOne;
	}
	public String getCellTwo() {
		return cellTwo;
	}
	public void setCellTwo(String cellTwo) {
		this.cellTwo = cellTwo;
	}
	public String getCellThree() {
		return cellThree;
	}
	public void setCellThree(String cellThree) {
		this.cellThree = cellThree;
	}
	public String getCellFour() {
		return cellFour;
	}
	public void setCellFour(String cellFour) {
		this.cellFour = cellFour;
	}
	public String getCellFive() {
		return cellFive;
	}
	public void setCellFive(String cellFive) {
		this.cellFive = cellFive;
	}
	public String getCellSix() {
		return cellSix;
	}
	public void setCellSix(String cellSix) {
		this.cellSix = cellSix;
	}
	public String getTotalAmount() {
		return totalAmount;
	}
	public void setTotalAmount(String totalAmount) {
		this.totalAmount = totalAmount;
	}
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((accessCodes == null) ? 0 : accessCodes.hashCode());
		result = prime * result + ((address == null) ? 0 : address.hashCode());
		result = prime * result + ((cellFive == null) ? 0 : cellFive.hashCode());
		result = prime * result + ((cellFour == null) ? 0 : cellFour.hashCode());
		result = prime * result + ((cellOne == null) ? 0 : cellOne.hashCode());
		result = prime * result + ((cellSix == null) ? 0 : cellSix.hashCode());
		result = prime * result + ((cellThree == null) ? 0 : cellThree.hashCode());
		result = prime * result + ((cellTwo == null) ? 0 : cellTwo.hashCode());
		result = prime * result + ((city == null) ? 0 : city.hashCode());
		result = prime * result + ((customerName == null) ? 0 : customerName.hashCode());
		result = prime * result + ((descriptionOfWork == null) ? 0 : descriptionOfWork.hashCode());
		result = prime * result + ((installerOne == null) ? 0 : installerOne.hashCode());
		result = prime * result + ((installerTwo == null) ? 0 : installerTwo.hashCode());
		result = prime * result + ((jobPhone == null) ? 0 : jobPhone.hashCode());
		result = prime * result + ((startingDate == null) ? 0 : startingDate.hashCode());
		result = prime * result + ((state == null) ? 0 : state.hashCode());
		result = prime * result + ((totalAmount == null) ? 0 : totalAmount.hashCode());
		result = prime * result + ((zip == null) ? 0 : zip.hashCode());
		return result;
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		WorkOrderDetailsTO other = (WorkOrderDetailsTO) obj;
		if (accessCodes == null) {
			if (other.accessCodes != null)
				return false;
		} else if (!accessCodes.equals(other.accessCodes))
			return false;
		if (address == null) {
			if (other.address != null)
				return false;
		} else if (!address.equals(other.address))
			return false;
		if (cellFive == null) {
			if (other.cellFive != null)
				return false;
		} else if (!cellFive.equals(other.cellFive))
			return false;
		if (cellFour == null) {
			if (other.cellFour != null)
				return false;
		} else if (!cellFour.equals(other.cellFour))
			return false;
		if (cellOne == null) {
			if (other.cellOne != null)
				return false;
		} else if (!cellOne.equals(other.cellOne))
			return false;
		if (cellSix == null) {
			if (other.cellSix != null)
				return false;
		} else if (!cellSix.equals(other.cellSix))
			return false;
		if (cellThree == null) {
			if (other.cellThree != null)
				return false;
		} else if (!cellThree.equals(other.cellThree))
			return false;
		if (cellTwo == null) {
			if (other.cellTwo != null)
				return false;
		} else if (!cellTwo.equals(other.cellTwo))
			return false;
		if (city == null) {
			if (other.city != null)
				return false;
		} else if (!city.equals(other.city))
			return false;
		if (customerName == null) {
			if (other.customerName != null)
				return false;
		} else if (!customerName.equals(other.customerName))
			return false;
		if (descriptionOfWork == null) {
			if (other.descriptionOfWork != null)
				return false;
		} else if (!descriptionOfWork.equals(other.descriptionOfWork))
			return false;
		if (installerOne == null) {
			if (other.installerOne != null)
				return false;
		} else if (!installerOne.equals(other.installerOne))
			return false;
		if (installerTwo == null) {
			if (other.installerTwo != null)
				return false;
		} else if (!installerTwo.equals(other.installerTwo))
			return false;
		if (jobPhone == null) {
			if (other.jobPhone != null)
				return false;
		} else if (!jobPhone.equals(other.jobPhone))
			return false;
		if (startingDate == null) {
			if (other.startingDate != null)
				return false;
		} else if (!startingDate.equals(other.startingDate))
			return false;
		if (state == null) {
			if (other.state != null)
				return false;
		} else if (!state.equals(other.state))
			return false;
		if (totalAmount == null) {
			if (other.totalAmount != null)
				return false;
		} else if (!totalAmount.equals(other.totalAmount))
			return false;
		if (zip == null) {
			if (other.zip != null)
				return false;
		} else if (!zip.equals(other.zip))
			return false;
		return true;
	}

}
