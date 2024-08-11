package com.revature.Project1Backend.Services;


import com.revature.Project1Backend.DAOs.EmployeeDAO;
import com.revature.Project1Backend.DAOs.ReimbursementDAO;
import com.revature.Project1Backend.Models.Employee;
import com.revature.Project1Backend.Models.Reimbursement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class ReimbursementService {

    private ReimbursementDAO rDAO;
    private EmployeeDAO eDAO;

    @Autowired
    public ReimbursementService(ReimbursementDAO rDAO, EmployeeDAO eDAO){

        this.rDAO = rDAO;
        this.eDAO = eDAO;

    }

    public Reimbursement getReimbursementById(int id){

        Optional<Reimbursement> empOptional = rDAO.findById(id);

        if(empOptional.isPresent())
            return empOptional.get();
         else
            return null;

    }

    public List<Reimbursement> getAllReimbursement(){
        List<Reimbursement> sortedReimbList =  rDAO.findAll();
        Collections.sort(sortedReimbList);
        return sortedReimbList;
    }

    public List<Reimbursement> getAllReimbursementsByStatus(String status){
        List<Reimbursement> sortedReimbList =  rDAO.findByStatus(status);
        Collections.sort(sortedReimbList);
        return sortedReimbList;

    }

    public List<Reimbursement> getAllReimbursementsByUserId(int userId){
        return rDAO.findByEmployeeEmployeeId(userId);
    }

    public List<Reimbursement> getAllReimbursementsByUserIdAndStatus(int userId,String status){
        return rDAO.findByEmployeeEmployeeIdAndStatus(userId,status);
    }

    public Reimbursement createReimb(Reimbursement reimb){

        Optional<Employee> empOptional = eDAO.findById(reimb.getEmployeeId());

        if(empOptional.isPresent()) {
            reimb.setEmployee(empOptional.get());
            return rDAO.save(reimb);
        } else
            return null;

    }

    public Reimbursement updateReimb(Reimbursement reimb,String field){

        Reimbursement fullReimb = getReimbursementById(reimb.getReimbId());
        System.out.println(field);
        switch(field){
            case "description": fullReimb.setDescription(reimb.getDescription());
                break;
            case "status":fullReimb.setStatus(reimb.getStatus());
                break;

        }

        return rDAO.save(fullReimb);
    }


}
