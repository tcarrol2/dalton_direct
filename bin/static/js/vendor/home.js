/**
 * 
 * Javascript code for the first/main page of the SIA application
 * 
 */   


function login(event) {
    event.preventDefault();
    $("#loginButton").html('<i class="fa fa-spinner fa-spin"></i>');
    $.ajax({
        url:"j_security_check",
        data: { j_username: $("#username").val(), j_password: $("#password").val() },
        type: "POST",
        dataType: "html",
        success: function(html){
            if(html == "<div>Error Occured</div>"){
                $('#loginErrorDiv').html('<div class="login-error">Please enter a valid user/pass</div>');
            }else{
                $('#login-modal').modal('hide');
                getUserDetails();
                // Do any additional processing here.

            }
            $("#loginButton").html('Sign In');
            return false;
        },
        error:function (xhr, ajaxOptions, thrownError){
        	$("#loginButton").html('Sign In');;
            return false;
        } 
    });
    return false;
}

function signOut(event) {
    event.preventDefault();
    // Destroy the session in the backend.
    $("#signOutButton").html('<i class="fa fa-spinner fa-spin"></i>');
    $.ajax({
        url:"rs/userDetails/logout",
        type: "GET",
        dataType: "json",
        success: function(html){
            // Change the top to show not logged in
            $("#username-link").html('<a href="#">Not signed in.</a>');
            // Get rid of all the cookies
            jQuery.cookie("THDSSO", null, { path: '/' });
            jQuery.cookie("JSESSIONID", null, { path: '/RealtimeAlerting/' });
            $.dough("THDSSO", "remove");
            $.dough("JSESSIONID", "remove");

            $(".login-toggle").toggleClass("hidden-menu-buttons");
            $("#signOutButton").html('Sign Out');
            return true;
        },
        error:function (xhr, ajaxOptions, thrownError){
        	$("#signOutButton").html('Sign Out');
            return false;
        } 
    });
    $('#login-modal').modal('hide');
    return true;
}

function getUserDetails() {
    event.preventDefault();
    $.ajax({
        url:"rs/userDetails",
        type: "GET",
        dataType: "json",
        async:false,
        success: function(data){
            userDetails = data;
            // There are lots of other fields that can be exposed here.
            $("#username-link").html('<a href="#">' + userDetails.fullName + '</a>');
            $(".login-toggle").toggleClass("hidden-menu-buttons");
        },
        error:function (xhr, ajaxOptions, thrownError){
            $("#username-link").html('<a href="#">Not signed in.</a>');
            userDetails = undefined;
        } 
    });
}