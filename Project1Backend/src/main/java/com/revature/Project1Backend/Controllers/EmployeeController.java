package com.revature.Project1Backend.Controllers;


import com.revature.Project1Backend.Models.Employee;
import com.revature.Project1Backend.Services.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.ResponseEntity.ok;

@RestController
@RequestMapping("/employee")
public class EmployeeController {

    private EmployeeService eService;

    @Autowired
    public EmployeeController(EmployeeService eService){

        this.eService = eService;

    }

    @GetMapping
    public ResponseEntity<List<Employee>> getAllUsers(){

        return ResponseEntity.ok(eService.getAllUsers());

    }
    @PostMapping
    public ResponseEntity<Employee> createUser(@RequestBody Employee emp){

        return ResponseEntity.ok(eService.createEmployee(emp));

    }
    //@PatchMapping




}
