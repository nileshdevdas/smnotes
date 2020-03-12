package com.siemens.cisampleapp;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController(value = "login")
public class LoginService {

    @RequestMapping(method = RequestMethod.GET)
    public String login(@RequestParam("username") String username, @RequestParam("password") String password){
        return "<p id='status'>SUCCESS</p>";
    }
}
