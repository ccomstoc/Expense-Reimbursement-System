package com.revature.Project1Backend.Services;


import com.revature.Project1Backend.DAOs.EmployeeDAO;
import com.revature.Project1Backend.Models.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {

    private EmployeeDAO eDAO;

    @Autowired
    public EmployeeService(EmployeeDAO eDAO){

        this.eDAO = eDAO;

    }

    public List<Employee> getAllUsers(){

        return eDAO.findAll();
    }

    public Employee createEmployee(Employee emp){
        return eDAO.save(emp);
    }
}
