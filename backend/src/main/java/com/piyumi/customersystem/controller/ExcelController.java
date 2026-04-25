package com.piyumi.customersystem.controller;

import com.piyumi.customersystem.service.ExcelService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/excel")
@CrossOrigin
public class ExcelController {
    private final ExcelService service;

    public ExcelController(ExcelService service){
        this.service = service;
    }

    @PostMapping("/upload")
    public String uploadExcel(@RequestParam("file") MultipartFile file){
        service.saveFormExcel(file);
        return "Excel file uploaded successfully";
    }
    
}
