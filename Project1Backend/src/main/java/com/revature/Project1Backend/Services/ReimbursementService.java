package com.revature.Project1Backend.Services;


import com.revature.Project1Backend.DAOs.EmployeeDAO;
import com.revature.Project1Backend.DAOs.ReimbursementDAO;
import com.revature.Project1Backend.Models.Employee;
import com.revature.Project1Backend.Models.Reimbursement;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class ReimbursementService {

    protected static final Logger log = LoggerFactory.getLogger(ReimbursementService.class);
    private ReimbursementDAO rDAO;
    private EmployeeDAO eDAO;

    @Autowired
    public ReimbursementService(ReimbursementDAO rDAO, EmployeeDAO eDAO){

        this.rDAO = rDAO;
        this.eDAO = eDAO;
        log.info("ReimbursementService Initialized");

    }

    public Reimbursement getReimbursementById(int id){
        log.info("getReimbursementById called with id= " + id);
        Optional<Reimbursement> empOptional = rDAO.findById(id);

        if(empOptional.isPresent())
            return empOptional.get();
         else
            return null;

    }

    public List<Reimbursement> getAllReimbursement(){
        log.info("getAllReimbursements called");
        List<Reimbursement> sortedReimbList =  rDAO.findAll();
        Collections.sort(sortedReimbList);
        return sortedReimbList;
    }

    public List<Reimbursement> getAllReimbursementsByStatus(String status){
        log.info("getAllReimbursementsByStatus called with status = " + status);
        List<Reimbursement> sortedReimbList =  rDAO.findByStatus(status);
        Collections.sort(sortedReimbList);
        return sortedReimbList;

    }

    public List<Reimbursement> getAllReimbursementsByUserId(int userId){
        log.info("getAllReimbursementsByUserId called with id= " + userId);
        return rDAO.findByEmployeeEmployeeId(userId);
    }

    public List<Reimbursement> getAllReimbursementsByUserIdAndStatus(int userId,String status){
        log.info("getAllReimbursementsByUserIdAndStatus called with id= " + userId + " status= " +status);
        return rDAO.findByEmployeeEmployeeIdAndStatus(userId,status);
    }

    public Reimbursement createReimb(Reimbursement reimb){
        log.info("createReimb called with reimbursement= " + reimb.toString());

        Optional<Employee> empOptional = eDAO.findById(reimb.getEmployeeId());

        if(empOptional.isPresent()) {
            reimb.setEmployee(empOptional.get());
            return rDAO.save(reimb);
        } else
            return null;

    }

    public Reimbursement updateReimb(Reimbursement reimb,String field){
        log.info("updateReimb called with feild= "+field+" reimbursement= " + reimb.toString());
        Reimbursement fullReimb = getReimbursementById(reimb.getReimbId());
        switch(field){
            case "description": fullReimb.setDescription(reimb.getDescription());
                break;
            case "status":fullReimb.setStatus(reimb.getStatus());
                break;

        }

        return rDAO.save(fullReimb);
    }

    public void deleteReimbursement(int id){
        log.info("deleteReimbursement called with id= " + id);
        rDAO.deleteById(id);
    }

    public Reimbursement putReimbursement(Reimbursement reimb){
        log.info("utReimbursement called with reimbursement= " + reimb.toString());
        Reimbursement fullReimb = getReimbursementById(reimb.getReimbId());
        reimb.setEmployee(fullReimb.getEmployee());
        return rDAO.save(reimb);
    }


}
