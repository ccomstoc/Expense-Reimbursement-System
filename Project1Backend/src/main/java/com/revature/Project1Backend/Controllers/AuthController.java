package com.revature.Project1Backend.Controllers;

import com.revature.Project1Backend.Models.DTO.AuthDTO;
import com.revature.Project1Backend.Models.Employee;
import com.revature.Project1Backend.Services.AuthService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins="http://localhost:3000", allowCredentials = "true")
public class AuthController {

    private AuthService aService;

    @Autowired
    public AuthController(AuthService aService){
        this.aService = aService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthDTO authDTO, HttpSession session){

        Employee emp = aService.login(authDTO,session);
        if(emp == null)
            return ResponseEntity.status(401).body("Invalid Credentials");

        return ResponseEntity.accepted().body(emp);

    }
}
