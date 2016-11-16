function THDLoginPage_validate() {
	// alert(1111);
	if (THDLoginPage_checkUserID()) {
		if (THDLoginPage_checkPassword()) {
			// THDLoginPage_setStoreCookie();
			THDLoginPage_setLocationCookie();
			return true;
		} else {
			parent.document.THDLoginPage.j_username.focus();
			return false;
		}
	} else {
		parent.document.THDLoginPage.j_username.focus();
		return false;
	}
}
function THDLoginPage_checkUserID() {
	usernameValue = parent.document.THDLoginPage.j_username.value;
	if (usernameValue !== null) {
		if (usernameValue.length > 0) {
			return true;
		} else {
			alert('Please enter a valid user ID.');
			return false;
		}
	} else {
		alert('Please enter a valid user ID.');
		return false;
	}
}
function THDLoginPage_checkPassword() {
	passwordValue = parent.document.THDLoginPage.j_username.value;
	if (passwordValue !== null) {
		if (passwordValue.length > 0) {
			return true;
		} else {
			alert('Please enter a valid password.');
			return false;
		}
	} else {
		alert('Please enter a valid password.');
		return false;
	}
}
function THDLoginPage_setLocationCookie() {
	var myLocation = parent.document.THDLoginPage.j_userbelongsto.value;
	// alert(myLocation);
	var now = new Date();
	fixDate(now);
	now.setTime(now.getTime() + 365 * 24 * 60 * 60 * 1000);
	setCookie('myLocation', myLocation, now, '/', 'homedepot.com');
}
function getCookie(name) {
	var dc = document.cookie;
	var prefix = name + "=";
	var begin = dc.indexOf(prefix);
	if (begin === -1) {
		return null;
	}
	var end = document.cookie.indexOf(";", begin);
	if (end === -1) {
		end = dc.length;
	}
	return unescape(dc.substring(begin + prefix.length, end));
}
function validate() {
	$.ajax({
		url : "/EnterpriseServiceRepository/j_security_check",
		data : {
			j_username : $("#usernameId").val(),
			j_password : $("#passwordId").val()
		},
		type : "POST",
		dataType : "html",
		async : false,
		success : function(html) {
			if (html == "<div>Error Occured</div>") {
				$("#errorDiv").html(
						"Please provide a valid user name & password.");
			} else {
				getUserDetails();
			}
		},
		error : function(xhr, ajaxOptions, thrownError) {
			alert(xhr.status + "           " + xhr.responseText);
			alert(thrownError);
		}
	});
}
function getUserDetails() {
	$.ajax({
		url : "rs/esr/getUserData",
		type : "GET",
		dataType : "json",
		success : function(data) {
			hideLoginDialog();
			var _userName = $("#userFullName");
			if (data.userName !== undefined) {
				if(data.userName!==null)
				{
					_userName.text(data.userName);
				}
			} else {
				_userName.text(data.userID);
			}
			_userName.data("authorized", data.authorized);
			if (data.authorized) {
				enableButtons();
			}
		}
	});
	return false;
}
function checkAndSubmit(e) {
	if (e.keyCode === 13) {
		validate();
		return false;
	}
}
function enableButtons() {
	var _userNameDiv = $("#userFullName");
	if (_userNameDiv.data("authorized")) {
		var _submitButton = $("#submitButton");
		_submitButton.removeAttr('disabled');
		_submitButton.parent().tooltip('disable');
	}
}
function logoutUser() {
	// $.cookie('THDSSO', null);
	var cookies = document.cookie.split(";");
	for (var i = 0; i < cookies.length; i++) {
		var equals = cookies[i].indexOf("=");
		var name = equals > -1 ? cookies[i].substring(0, equals) : cookies[i];
		if (name !== null && $.trim(name) === 'THDSSO') {document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;Max-Age=0";
		} else if (name !== null && $.trim(name) === 'JSESSIONID') {document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/EnterpriseServiceRepository;Max-Age=0";
		}
	}
	$("#welcomeSpan").empty();
	$("#welcomeSpan").hide();
	$("#logout").hide();
	$("#login").show();
}