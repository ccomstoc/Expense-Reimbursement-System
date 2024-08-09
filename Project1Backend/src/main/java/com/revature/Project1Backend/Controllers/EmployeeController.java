package com.revature.Project1Backend.Controllers;


import com.revature.Project1Backend.Models.Employee;
import com.revature.Project1Backend.Models.Reimbursement;
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
    public ResponseEntity<List<Employee>> getAllEmployee(){

        return ResponseEntity.ok(eService.getAllUsers());

    }
    @PostMapping
    public ResponseEntity<Employee> createEmployee(@RequestBody Employee emp){

        return ResponseEntity.ok(eService.createEmployee(emp));

    }
    @PatchMapping("/{field}")
    public ResponseEntity<Employee> updateEmployee(@RequestBody Employee emp, @PathVariable String field){

        return ResponseEntity.ok(eService.updateEmployee(emp,field));

    }
    @DeleteMapping("{id}")
    public ResponseEntity<Object> deleteEmployee(@PathVariable int id){
        eService.deleteEmployee(id);
        return ResponseEntity.status(204).body(null);
    }





}
