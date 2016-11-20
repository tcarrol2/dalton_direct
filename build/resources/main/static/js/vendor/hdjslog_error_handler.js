/* This is an optional uncaught error handler that is intended to be used with log4javascript_hdconfig.js,
 * in which case it will log as "fatal", which by default logs to the server and orangelog.
 * 
 * If not used with log4javascript_hdconfig.js it will log to console.log and alert if that is not available.
 */
(function() { 
	//"use strict";
	window.onerror = function (errorMsg, url, lineNumber, column, errorObj) {
		var errorMessage = "Unknown error has occurred. " + 
			'Error: ' + errorMsg + ' Script: ' + url + ' Line: ' + lineNumber + 
			' Column: ' + column + ' StackTrace: ' +  errorObj;
		if (typeof hdlog === 'object'
			&& typeof hdlog.getLogger === 'function') 
		{
			hdlog.getLogger("hdglobal_error_handler").fatal(errorMessage, errorObj);
		} else {
			errorMessage = "FYI: hdlog is not defined! Error: " + errorMessage;
			if ( typeof console === 'object' ) {
				console.log(errorMessage);
			} else {
				alert(errorMessage);
			}
		}
	};
})();