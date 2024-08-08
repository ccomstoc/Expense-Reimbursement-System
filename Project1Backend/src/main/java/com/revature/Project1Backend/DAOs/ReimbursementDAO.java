package com.revature.Project1Backend.DAOs;

import com.revature.Project1Backend.Models.Reimbursement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReimbursementDAO extends JpaRepository<Reimbursement, Integer> {

    public List<Reimbursement> findByStatus(String status);
    public List<Reimbursement> findByEmployeeEmployeeId(int userId);
    public List<Reimbursement> findByEmployeeEmployeeIdAndStatus(int userId, String status);


}
