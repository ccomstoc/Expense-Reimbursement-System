package com.revature.Project1Backend.Services;

import com.revature.Project1Backend.DAOs.EmployeeDAO;
import com.revature.Project1Backend.Models.DTO.AuthDTO;
import com.revature.Project1Backend.Models.Employee;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    public EmployeeDAO eDAO;

    @Autowired
    public AuthService(EmployeeDAO eDAO){
        this.eDAO = eDAO;

    }

    public Employee login(AuthDTO authDTO, HttpSession session){

        Employee employee = eDAO.findByUsernameAndPassword(authDTO.getUsername(), authDTO.getPassword());
        if(employee == null)
            return null;//Throw here?

        //using client side storage so no particular useful. But its cool to have in case we want to make it hybrid
        session.setAttribute("employeeId",employee.getEmployeeId());
        session.setAttribute("firstName", employee.getFirstName());
        session.setAttribute("lastName", employee.getLastName());
        session.setAttribute("username", employee.getUsername());
        session.setAttribute("role",employee.getRole());

        return employee;


    }
}
