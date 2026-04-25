package com.piyumi.customersystem.service;

import com.piyumi.customersystem.model.Customer;
import com.piyumi.customersystem.repository.CustomerRepository;
import org.apache.poi.ss.usermodel.*;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;

import java.util.ArrayList;
import java.util.List;
@Service

public class ExcelService {
    private final CustomerRepository repo;

    public ExcelService(CustomerRepository repo){
        this.repo = repo;
    }

    public void saveFormExcel(MultipartFile file){
        try(InputStream is = file.getInputStream()){
            Workbook workbook = WorkbookFactory.create(is);
            Sheet sheet = workbook.getSheetAt(0);
            List<Customer> customers = new ArrayList<>();

            for(Row row : sheet){
                if(row.getRowNum() == 0) continue;
                Customer c = new Customer();

                c.setName(row.getCell(0).toString());
                c.setDateOfBirth(row.getCell(1).getLocalDateTimeCellValue().toLocalDate());
                
                Cell nicCell = row.getCell(2);
                if(nicCell.getCellType() == CellType.NUMERIC){
                    c.setNic(String.valueOf((long) nicCell.getNumericCellValue()));
                } else{

                    c.setNic(nicCell.getStringCellValue());
                }

                customers.add(c);

            }
            List<Customer> validCustomers = new ArrayList<>();
            for(Customer c : customers){
                if(repo.findByNic(c.getNic()).isEmpty()){
                    validCustomers.add(c);
                }
            }
            for(int i =0; i < validCustomers.size();i +=100){
                repo.saveAll(validCustomers.subList(i, Math.min(i + 100, validCustomers.size())));
            }

        } catch (Exception e){
            throw new RuntimeException("Excel upload Failed: " + e.getMessage());
        }
    }
    
}
