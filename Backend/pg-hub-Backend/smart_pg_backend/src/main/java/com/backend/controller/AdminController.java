package com.backend.controller;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.backend.dto.response.AdminDashboardStats;
import com.backend.dto.response.AdminOwnerProperties;
import com.backend.dto.response.AdminUserActivity;
import com.backend.service.AdminService;

import java.util.List;


@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService; 

    @GetMapping("/dashboard")
    public ResponseEntity<AdminDashboardStats> getDashboardStats() {
        return ResponseEntity.ok(adminService.getDashboardStats());
    }

    @GetMapping("/users") 
    public ResponseEntity<List<AdminUserActivity>> getAllUsers() {
        return ResponseEntity.ok(adminService.getAllUserActivity());
    }

    @GetMapping("/owners")
    public ResponseEntity<List<AdminOwnerProperties>> getOwnersWithProperties() {
        return ResponseEntity.ok(adminService.getOwnersWithProperties());
    }
}
   