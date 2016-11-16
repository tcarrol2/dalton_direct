package com.hello;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GreetingController {
    
    @RequestMapping("/addition")
    public int addition(@RequestParam(value="numberOne", defaultValue="1") int numberOne,
    		@RequestParam(value="numberTwo", defaultValue="2") int numberTwo) {
        			return numberOne+numberTwo;
    }
    
    @RequestMapping("/algo")
    public int algo(@RequestParam(value="numberOne", defaultValue="1") int numberOne,
    		@RequestParam(value="numberTwo", defaultValue="2") int numberTwo) {
    	
    				
        			return numberOne+numberTwo;
    }
}