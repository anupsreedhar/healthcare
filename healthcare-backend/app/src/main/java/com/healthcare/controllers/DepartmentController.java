package com.healthcare.controllers;

import com.healthcare.model.Department;
import com.healthcare.services.DepartmentService;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@Log4j2
@RestController
@RequestMapping("/departments")
public class DepartmentController {

    private final DepartmentService departmentService;

    public DepartmentController(DepartmentService departmentService) {
        this.departmentService = departmentService;
    }

    // ✅ Fetch all departments
    @GetMapping
    public List<Department> getAllDepartments() {
        return departmentService.getAllDepartments();
    }

    // ✅ Fetch one department by ID
    @GetMapping("/{id}")
    public Department getDepartmentById(@PathVariable Long id) {
        return departmentService.getDepartmentById(id);
    }
}
