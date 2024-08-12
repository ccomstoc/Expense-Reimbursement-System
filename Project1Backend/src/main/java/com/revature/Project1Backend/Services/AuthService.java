package com.revature.Project1Backend.Services;

import com.revature.Project1Backend.DAOs.EmployeeDAO;
import com.revature.Project1Backend.Models.DTO.AuthDTO;
import com.revature.Project1Backend.Models.Employee;
import jakarta.servlet.http.HttpSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    protected static final Logger log = LoggerFactory.getLogger(AuthService.class);
    public EmployeeDAO eDAO;

    @Autowired
    public AuthService(EmployeeDAO eDAO){
        this.eDAO = eDAO;

    }

    public Employee login(AuthDTO authDTO, HttpSession session){

        Employee employee = eDAO.findByUsernameAndPassword(authDTO.getUsername(), authDTO.getPassword());
        if(employee == null){
            log.warn("Login attempted with invalid credentials");
            return null;
        }
        log.info("User "+ employee.getUsername() + " logged in successfully");

        //using client side storage so no particular useful. But its cool to have in case we want to make it hybrid
        session.setAttribute("employeeId",employee.getEmployeeId());
        session.setAttribute("firstName", employee.getFirstName());
        session.setAttribute("lastName", employee.getLastName());
        session.setAttribute("username", employee.getUsername());
        session.setAttribute("role",employee.getRole());

        return employee;


    }
}
