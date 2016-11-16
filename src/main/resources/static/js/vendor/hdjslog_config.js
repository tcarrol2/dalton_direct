"use strict";
/* 
 * This creates a logger factory in global scope called "hdlog". 
 * Retrieve a logger via hdlog.getLogger("loggerName"), where loggerName is hierarchical like log4j.
 * E.g., you can do hdlog.getLogger("yourModuleName.trickyCode"); which will allow you to narrow down focus on logged events.
 * The returned logger objects are very similar to the log4j Logger API.
 * log methods include: trace, debug, info, warn, error, fatal.
 * Addtions: 
 *   orange: which accepts the same inputs as logger.info, and will be logged back to the server's OrangLog (and ultimately Splunk).
 *
 * There are 3 configs. 
 * 1. The dynamic runtime config retrieved from the service via a polling mechanism.
 * 2. The static optional client app config provided by the global variable hdDefaultLoggerConfig
 * 3. The static default config, which is shipped with hdconfig.js
 *
 * The default configuration sets up the root logger with a console appender and an Ajax appender.
 * The console appender is configured at INFO level and is hidden by default, but can be displayed in the browser
 * by keystroke combination ctrl+alt+shift+L (or ctrl+option+shift+L on the mac).
 * The Ajax appender posts the log event to a web service and is configured at ERROR level by default. 
 * Note: the web service will automatically OrangeLog events of ERROR and higher, so there is no need to duplicate logging calls
 * in the client app.
 * 
 * TODO Add splunk link
 * 
 * Recommendation: load the hdjslog_error_handler.js script which registers an error handler that automatically logs unhandled errors. 
 */

/* Design note: this factory pattern was copied from log4javascript.
 * If you are not using AMD or CommonJS, it puts the "hdlog" into global scope.
 */(function(factory, root) {
	if (typeof define == "function" && define.amd) {
		// AMD. Register as an anonymous module.
		define(factory);
	} else if (typeof module != "undefined" && typeof exports == "object") {
		// Node/CommonJS style
		module.exports = factory();
	} else {
		// No AMD or CommonJS support so we place hdlog in (probably) the global variable
		root.hdlog = factory();
	}
})(function /* hdlog factory */ () {
	var hdlog /* Defines the public API and is returned/exported from this factory.  */ 
	, logConfigWrapper /* This contains the current configuration object with a timestamp that was used to configure the logging environment */
	, appendersMap = {} /* Map of appenders by name of all appenders configured by this module. */
	, log = getLog() /* internal logger */
	/* This is the default logger definition! It is intended to meet the needs of >= 80% of applications. */
	, defaultLoggerConfig = { 
		configPollSeconds: 60, /* Determines how often the service is polled for a runtime config change. */
		logConfigDebug: false, /* set this to true if troubleshooting logging. */
		enabled: true, /* if false, this will disable all logging. */
		showStackTraces: true,
		/* These are global appenders (Singletons) that can be referenced by Loggers.
		 * The keys are the name of the appender.
		 **/
		appenders: {
			ajaxAppender : { 
				configType: "AjaxAppender",
				threshold: "ALL", 
				url: createJSLogServiceBaseURL() + "/log",
				ajaxWithCredentials: true,
				batchSize: 1, /* TODO I want to be able to use batching, but flush on Error or higher.  Is that possible? May need to use separate instances of AjaxAppenders. */
				waitForResponse: true, /* This will cause queueing so that logging doesn't consume request threads */
				timerInterval: 0, /* Disabling timer interval by default, since we are using batching. */
				sendAllOnUnload: true
			}
			, clientSideAppender : {
				configType: "ClientSideAppender",
				isPopUp: true, /* true launches in a separate window. False is in the same window. */
				/* Note: isPopUp=false then it won't display until a message is logged. */
				threshold: "ALL", /* set to ALL so that this is really controlled by the logger's level */
				lazyInit: true, /* set to true because we don't want the popup to show. */
				initiallyMinimized: true,					
				maxMessages: 1000,
				useDocumentWrite: true, 
				newestMessageAtTop: false, 
				scrollToLatestMessage: true,
				showCommandLine: true,
				commandLineObjectExpansionDepth: 1,
				commandLayout: '%m',
				/* The following only apply to PopUp */
				reopenedWhenClosed: true,
				focusPopUp: false,
				useOldPopUp: true,
				complainAboutPopUpBlocking: true
				/* end PopUp-only config */
			}
			, consoleAppender : {
				configType: "ConsoleAppender",
				threshold: "ALL", /* set to ALL so that this is really controlled by the logger's level */
			}
		},
		/* loggerConfigs allows for configuring loggers. The keys are the names of loggers and their values are the logger config.
		 * configType attribute exists to identify configuration objects versus actual objects (e.g. Logger, AjaxAppender, etc. 
		 */
		loggerConfigs: {
//			root: {
//				
//			}, 
			/* Internal logging framework logger. Default: log errors 
			 * NOTE: using an internal logger does not work for all config errors. For example, this may not be configured yet when the error occurs. */
			thdjsLogFramework : {
				level: "INFO",
				additivity: true,
				appenders: {
					console : { 
						configType: "ReferenceAppender",
						appenderReference: "clientSideAppender"
					}
					, remote : {  
						configType: "ReferenceAppender",
						appenderReference: "ajaxAppender"
					}
				}
			},
			thd: {
				level: "INFO", /*  */
				additivity: true,
				appenders: {
					console : { 
						configType: "DelegatorAppender",
						threshold: "DEBUG",
						appenderReference: "clientSideAppender"
					}
					, remote : {
						configType: "DelegatorAppender",
						threshold: "ERROR",
						appenderReference: "ajaxAppender"
					} 
				}
			}, 
			thdOrangeLog : {
				level: "ALL", /* All OrangeLogging should be logged. */
				additivity: true,
				appenders : {
					console : { 
						configType: "DelegatorAppender",
						threshold: "ALL", /* All OrangeLogging should be logged. */
						appenderReference: "clientSideAppender"
					}
					, remote : {
						configType: "DelegatorAppender",
						threshold: "ALL",
						appenderReference: "ajaxAppender"
					}
				}
			}
		}
	};
	
	/* ---------------------------------------------------------------------- */
	// DelegatorAppender - this appender wraps another appender that it delegates events to as long as its threshold is met.

	function DelegatorAppender(delegateAppender) {
		this.delegateAppender = delegateAppender;
	}

	DelegatorAppender.prototype = new log4javascript.Appender();

	//DelegatorAppender.prototype.layout = new SimpleLayout();

	DelegatorAppender.prototype.doAppend = function(loggingEvent) {
		this.delegateAppender.doAppend(loggingEvent);
	};

	DelegatorAppender.prototype.toString = function() {
		return "DelegatorAppender";
	};

	initLogFromConfig();
	setTimeout(resetLoggingFromRuntimeConfig, 0);
	
	/* Define the public API */
	hdlog = {
		/* logger factory */
		getLogger: function (name) {
			var logger = log4javascript.getLogger("thd." + name);
			/* Add an "orange" function to every logger. The logger's name will be included for further context. */
			var orangeLog = log4javascript.getLogger("thdOrangeLog." + name);
			logger.orange = function() {
				orangeLog.info.apply(orangeLog, arguments); // Pass the arguments directly along to the info method.
			};
			return logger;
		}
	
		/* Do NOT use. Only exposed for testing. */
		, _TEST_ONLY_ : {
			_merge: mergeCopyRightToLeft
			, _parseLevel: parseLevel
		}
	};
	
	return hdlog;
	
	/* parmConfig is optional. If provided it will be used and the internal default configuration will be merged into it.
	 * The merged config object will be used to configure the log4javascript environment and the config object
	 * is stored in "logConfigWrapper" with a timestamp (long) */
	function initLogFromConfig(parmConfig) {
		/* Configs further left take precedence over configs further right.*/ 
		var loggerConfigName
		, curLoggerConfig
		, logger
		, config = mergeCopyRightToLeft(parmConfig, window.hdDefaultLoggerConfig, defaultLoggerConfig);
	    log.debug("Updated config", config);
	    log4javascript.logLog.setQuietMode(!config.logConfigDebug);
	    log4javascript.logLog.setAlertAllErrors(config.logConfigDebug);
	    log4javascript.setEnabled(config.enabled);
	    log4javascript.setShowStackTraces(config.showStackTraces);
	    
	    configureAppenders(config);

	    for( loggerConfigName in config.loggerConfigs ) {
	    	curLoggerConfig=config.loggerConfigs[loggerConfigName];
	    	if (loggerConfigName.toUpperCase() === "ROOT") {
	    		logger = log4javascript.getRootLogger();
	    	} else {
	    		logger = log4javascript.getLogger(loggerConfigName);
	    	}
	    	/* Defaults to debug at the highest level, and is inherited. This is inherited if not set, and I think there is no way to unset it (defect?). */
	    	logger.setLevel(
	    			parseLevel(curLoggerConfig.level));
	    	if ( typeof(curLoggerConfig.additivity) !== 'undefined') {
	    		logger.setAdditivity(curLoggerConfig.additivity);
	    	}
	    	/* FIXME need to flush events from any current appenders. e.g. AjaxAppender.sendAll(), but how do we force incomplete batches?*/
	    	logger.removeAllAppenders(); // TODO could this cause messages that are queued to be lost?
	    	
	    	configureAppenders(curLoggerConfig)
    			.forEach(function(appender) {
					logger.addAppender(appender);
    			});
	    	
	    }
	    
	    if (!Date.now) { // shim for IE8-
	        Date.now = function() { return new Date().getTime(); };
	    }
	    
	    logConfigWrapper = {
	    	/* Hack: the closured logConfigWrapper will be falsy the first time thru and we want to set timeout to 0 so that it can be overridden by the runtime config. */
	    	timestamp : logConfigWrapper ? Date.now() : 0 
	    	, config: config
	    };
	    return;
	
	    /* This creates a list of appenders from the config */
	    function configureAppenders(config) {
			var curAppenderConfigName
			, curAppenderConfig
			, appenders = [];
	    	for(curAppenderConfigName in config.appenders) {
	    		curAppenderConfig=config.appenders[curAppenderConfigName];
	    		if (curAppenderConfig.configType==='ReferenceAppender') {
	    			appenders.push( createReferenceAppenderFromConfig(curAppenderConfig) );
	    		} else if (curAppenderConfig.configType==='DelegatorAppender') {
	    			appenders.push( createDelegatorFromConfig(curAppenderConfig) );
	    		} else if (curAppenderConfig.configType==='AjaxAppender') {
	    			appenders.push( appendersMap[curAppenderConfigName] = createAjaxAppenderFromConfig(curAppenderConfig) );
	    		} else if (curAppenderConfig.configType==='ClientSideAppender') {
	    			appenders.push( appendersMap[curAppenderConfigName] = createClientSideAppenderFromConfig(curAppenderConfig) );
	    		} else if (curAppenderConfig.configType==='ConsoleAppender') {
	    			appenders.push( appendersMap[curAppenderConfigName] = createConsoleAppenderFromConfig(curAppenderConfig) );
	    		/* TODO else if ( is actual appender object) { add it } */
	    		} else { 
	    			log.error("Unrecognized appender!", curAppenderConfig);
	    		}
	    	}
	    	return appenders;
	    }
	    
	    function createReferenceAppenderFromConfig(refAppenderConfig) {
	    	var refAppender = appendersMap[refAppenderConfig.appenderReference];
	    	if ( ! refAppender) {
	    		log.error('createReferenceAppenderFromConfig: appenderReference [' + refAppenderConfig.appenderReference + '] does not exist!');
	    	} else {
	    		return refAppender;
	    	}
	    }
	    
	    function createDelegatorFromConfig(delegatorAppenderConfig) {
	    	var delegatorAppender,
	    	delegateAppender = appendersMap[delegatorAppenderConfig.appenderReference];
	    	if ( ! delegateAppender) {
	    		log.error('createDelegatorFromConfig: Appender named [' + delegatorAppenderConfig.appenderReference + '] does not exist!');
	    		return;
	    	}
	    	delegatorAppender = new DelegatorAppender(delegateAppender);
	    	delegatorAppender.setThreshold(
	    			parseLevel(delegatorAppenderConfig.threshold));
	    	return delegatorAppender;
	    }
	    
	    function createAjaxAppenderFromConfig(ajaxAppConfig) {
	    	var appender = new log4javascript.AjaxAppender(ajaxAppConfig.url, ajaxAppConfig.ajaxWithCredentials);
	    	var layout = new log4javascript.JsonLayout();
	    	appender.setThreshold(parseLevel(ajaxAppConfig.threshold));
	    	appender.addHeader("Content-Type", "application/json");
	    	appender.setBatchSize(ajaxAppConfig.batchSize); /* incomplete batches will not be sent (even if "timed" or sendAll()), unless page unload and setSendAllOnUnload is true. */
	    	appender.setTimerInterval(ajaxAppConfig.timerInterval);
	    	appender.setTimed(ajaxAppConfig.timerInterval>0);
	    	appender.setWaitForResponse(ajaxAppConfig.waitForResponse); /* This will cause queueing so that logging doesn't consume request threads */
	    	appender.setSendAllOnUnload(ajaxAppConfig.sendAllOnUnload); /* overrides batch and timed */
	    	//appender.setRequestSuccessCallback(); /* Could this be useful for returning log configurations? */
	    	appender.setFailCallback(function (message) {
	    		log.error("AjaxAppender Error: " + message);
	    	});
	    	appender.setLayout(layout);
	    	log.debug("createAjaxAppenderFromConfig: ", appender);
	    	return appender;
	    }
	
	    function createClientSideAppenderFromConfig(clientAppConfig) {
	    	/* I originally thought that PopUpAppender and InPageAppender had similar attributes, but I think they are less similar
	    	 * and I noticed that some shared attributes had different defaults, so I documented below for quick access.
	    	 * Defaults documented: D=Both, P=PopUpAppender, I=InPageAppender
	    	 */
	    	var isPopUp = clientAppConfig.isPopUp;
	    	var appender = isPopUp ?
	    					new log4javascript.PopUpAppender(clientAppConfig.lazyInit) :
	    					new log4javascript.InPageAppender(clientAppConfig.containerElem, clientAppConfig.lazyInit);
	    	appender.setLayout(new log4javascript.PatternLayout("%d{HH:mm:ss} %-5p - %m{10}%n"));
	    	appender.setThreshold(
	    			parseLevel(clientAppConfig.threshold));
	    	appender.setInitiallyMinimized(clientAppConfig.initiallyMinimized); /* D=false. */
	    	//appender.setLazyInit(true); /* NO SETTER! P=false; I=true */
	    	appender.setUseDocumentWrite(clientAppConfig.useDocumentWrite); /* D=true. If false only needed if page sets document.domain and will require console.html, and I think setUseOldPopUp is effectively false. */
	    	appender.setNewestMessageAtTop(clientAppConfig.newestMessageAtTop); /* P=false, I=?Not Documented? */
	    	appender.setScrollToLatestMessage(clientAppConfig.scrollToLatestMessage); /* P=true, I=?Not Documented? */
	    	appender.setMaxMessages(clientAppConfig.maxMessages); /* D=null (unlimited) */
	    	appender.setShowCommandLine(clientAppConfig.showCommandLine); /* D?=true */
	    	appender.setCommandLineObjectExpansionDepth(clientAppConfig.commandLineObjectExpansionDepth); /* D=1 Note: there is a built in command line command for this -> expansionDepth */
	    	//appender.setCommandWindow(); /* Not sure about this one. D=??? */
	    	appender.setCommandLayout(clientAppConfig.commandLayout); /* D=%m */
			//appender.setWidth(600); /* I=100%, P=600 */
			//appender.setHeight(400); /* I=250px, P=400 */
	    	if (isPopUp) { /* configure PopUp-specific properties */
	    		appender.setReopenWhenClosed(clientAppConfig.reopenedWhenClosed); /* P=false */
	    		appender.setFocusPopUp(clientAppConfig.focusPopup); /* P=false */
	    		appender.setUseOldPopUp(clientAppConfig.useOldPopUp); /* P=true */
	    		appender.setComplainAboutPopUpBlocking(clientAppConfig.complainAboutPopUpBlocking); /* P=true */
	    	} else { /* configure InPage-specific properties */
	    		//addCssProperty(prop,value) /* I=What is default? TODO Should/Can we make it resizeable? */
	    	}
	    	
	    	function toggleConsoleDisplay() {
	    		/* Toggle show/hide by adding a "private" member _hide to the appender. */
	    		if ( appender._hide ) {
	    			appender.hide();	    			
	    		} else {
	    			appender.show(); 
	    		}
	    		appender._hide = ! appender._hide;
	    	}
	    	
	    	/* ctrl+shift+l listener Ref: http://javascript.info/tutorial/keyboard-events */
	    	if ( window.document ) {
	    		document.onkeydown = function(e) {
	    			if ( e.ctrlKey && e.shiftKey && e.altKey 
	    				&& ( e.key == 76 || e.which == 76 )
	    			) {
	    				toggleConsoleDisplay();
	    			}			
	    		};
	    	}
	    	
	    	/* Shortcut is a nice library, but overkill for our needs. http://www.openjs.com/scripts/events/keyboard_shortcuts/ */
	//    	shortcut.add("ctrl+shift+L", function(a) {
	//    		toggleConsoleDisplay();
	//    	});
	    	
	    	return appender;
	    }
	} // End initLogFromConfig scope
	    
	function createConsoleAppenderFromConfig(config) {
		return new log4javascript.BrowserConsoleAppender();
	}
	
	function resetLoggingFromRuntimeConfig() {
		var xmlhttp, preventCaching, retrievedConfig;
		log.trace('Attempting to refresh config...');
		
		if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
			xmlhttp = new XMLHttpRequest();
		} else {// code for IE6, IE5
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4) {
				if (xmlhttp.status == 200) {
					log.trace(xmlhttp.responseText);
					try {
						retrievedConfig = JSON.parse( xmlhttp.responseText );
					} catch(exc) {
						log.timeEnd("resetLoggingFromRuntimeConfig()");
						log.error('Failed to retrieve Logger config due to error parsing response. http status: ', xmlhttp.status,': ', xmlhttp.statusText, ': responseText: ' + xmlhttp.responseText, exc);
						return; /* if we are returning 200 non-JSON, then we don't need to worry about retrying later. */
					}
					log.debug('Logger config retrieved from service: ', retrievedConfig);
					if ( typeof retrievedConfig.timestamp == 'number'
						&& retrievedConfig.timestamp > logConfigWrapper.timestamp ) {
							log.debug('Using log config retrieved from service because it contains a newer timestamp than the current config.', logConfigWrapper.timestamp);
							logConfigWrapper = initLogFromConfig(retrievedConfig.config);
					} else {
						log.debug('Logger config retrieved from service does not contain a newer timestamp than the current config.', logConfigWrapper.timestamp);
					}
				} else {
					log.warn('Failed to retrieve Logger config. http status: ', xmlhttp.status,': ', xmlhttp.statusText, ': responseText: ' + xmlhttp.responseText);
				}
				log.timeEnd("resetLoggingFromRuntimeConfig()");
				/* Check again later */
				setTimeout(resetLoggingFromRuntimeConfig, logConfigWrapper.config.configPollSeconds * 1000);
			}
		};
		log.time("resetLoggingFromRuntimeConfig()");
		preventCaching = "?preventCaching=" + Math.random();
		xmlhttp.open("GET", createJSLogServiceBaseURL() + "/config" + preventCaching,true);
		xmlhttp.send();
	}
	
	function getLog() {
		return log4javascript.getLogger("thdjsLogFramework");
	}
	
	function createJSLogServiceBaseURL() {
		/* TODO should we default to https:// or continue to use the scheme of the location? */
		return window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/" + window.location.pathname.split("/",2)[1] + "/jslog";		
	}
	
	/* Performs a deep copy merge into a new object.
	 * The arguments furthest to the left have higher precedence in merge conflicts.
	 * If arg1 and arg2 are different types. arg1 is returned.
	 * If arg1 and arg2 are both objects then they are merged. has key "one" and arg2 has key "
	 * accepts 0-* args. If > 1 arg, the Nth arg
	 * If 0 args returns undefined.
	 * If 1 arg returns the arg.
	 */
	function mergeCopyRightToLeft() {
		var retVal = {}, i=0;
		for(;i<arguments.length;i++) {
			_merge(retVal, arguments[i]);
		}
		return retVal;

		/*
		* Create a merged copy of the secondaryObj into the primary object.  If any property conflicts occur the 1st argument overrules.
		* If the conflicting properties are both objects they will be recursively merged.
		* Either arg can be null or undefined. If both are undefined this returns undefined. If both are null, this returns null.
		*/
		function _merge(primaryObj, secondaryObj) {
		  var p;			  
		  //log.debug("mergeCopyRightToLeft: Input primaryObj=", primaryObj, "; secondaryObj=", secondaryObj);
		  if (typeof secondaryObj==='undefined') {
			  return;
		  }
		  /* If not the same type then the primary rules. */
		  if (typeof primaryObj !== typeof secondaryObj) {
			  return;
		  }
		  // else they are the same type and neither are undefined.
		  if ( typeof primaryObj === 'object' ) {
			  for (p in secondaryObj) {
				  if (typeof primaryObj[p]==='undefined') {
					  primaryObj[p] = _deepCopy(secondaryObj[p]);
				  } else if (typeof primaryObj[p]==='object') {
					  _merge(primaryObj[p], secondaryObj[p]);
				  } 
				  // else non-object, so keep primaryObj[p]'s value 
			  }
		  } else { // else same type and not objects. Take primary.
			  return _deepCopy(primaryObj);
		  }
		  //log.debug("mergeCopyRightToLeft: Output=", primaryObj);
		  return;
		  
		  function _deepCopy(source) {
			var target,prop;
			if (typeof source==='object') {
				target = {};
				for (prop in source) {
			      target[prop] = _deepCopy(source[prop]);
				}
				return target;
			} else { 
				/* assert immutable type */
				return source;
			}  
		  }
		}
	}
	
    /* logs a warning but returns OFF if not a match, otherwise return the log4javascript level */
    function parseLevel(level) {
    	if ( typeof level == 'string') {
	    	switch(level.toUpperCase()) {
		    	case "ALL": return log4javascript.Level.ALL;
		    	case "TRACE": return log4javascript.Level.TRACE;
		    	case "DEBUG": return log4javascript.Level.DEBUG;
		    	case "INFO": return log4javascript.Level.INFO;
		    	case "WARN": return log4javascript.Level.WARN;
		    	case "ERROR": return log4javascript.Level.ERROR;
		    	case "FATAL": return log4javascript.Level.FATAL;
		    	case "OFF": return log4javascript.Level.OFF;
	    	}
    	}
	    log.warn("parseLevel: Invalid level " + level + ". Returning OFF.");
    	return log4javascript.Level.OFF;
    }
    
	
}, this);