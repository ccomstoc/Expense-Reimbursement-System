package com.revature.Project1Backend.DAOs;

import com.revature.Project1Backend.Models.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeDAO extends JpaRepository<Employee, Integer> {

    public Employee findByUsernameAndPassword(String username, String password);

}
