package com.revature.Project1Backend.Controllers;

import com.revature.Project1Backend.Models.Reimbursement;
import com.revature.Project1Backend.Services.ReimbursementService;
import jakarta.websocket.server.PathParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import static org.springframework.http.ResponseEntity.ok;
import static org.springframework.http.ResponseEntity.status;

import java.util.List;

@RestController
@RequestMapping("/reimbursement")
@CrossOrigin
public class ReimbursementController {

    private ReimbursementService rService;

    @Autowired
    public ReimbursementController(ReimbursementService rService){
        this.rService = rService;
    }

    @GetMapping
    public ResponseEntity<List<Reimbursement>> getAllReimbursements(){
        return ResponseEntity.ok(rService.getAllReimbursement());
    }

    //TODO:these may return optional?

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Reimbursement>> getReimbursementsByStatus(@PathVariable String status){
        return ResponseEntity.ok(rService.getAllReimbursementsByStatus(status));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Reimbursement>> getReimbursementsByStatus(@PathVariable int userId){
        return ResponseEntity.ok(rService.getAllReimbursementsByUserId(userId));
    }
    @GetMapping("/user/{userId}/{status}")
    public ResponseEntity<List<Reimbursement>> getReimbursementsByStatusAndId(@PathVariable int userId, @PathVariable String status){
        return ResponseEntity.ok(rService.getAllReimbursementsByUserIdAndStatus(userId,status));
    }
    @PostMapping
    public ResponseEntity<Reimbursement> createUser(@RequestBody Reimbursement reimb){
        return ResponseEntity.status(201).body(rService.createReimb(reimb));

    }
    @PatchMapping("/{field}")
    public ResponseEntity<Reimbursement> updateDescription(@RequestBody Reimbursement reimb, @PathVariable String field){
        return ResponseEntity.ok(rService.updateReimb(reimb, field));
    }


    @DeleteMapping("{id}")
    public ResponseEntity<Object> deleteReimbursement(@PathVariable int id){
        rService.deleteReimbursement(id);
        return ResponseEntity.status(204).body(null);
    }
    @PutMapping
    public ResponseEntity<Reimbursement> putReimbursement(@RequestBody Reimbursement reimb){
        return ResponseEntity.ok(rService.putReimbursement(reimb));
    }





}
