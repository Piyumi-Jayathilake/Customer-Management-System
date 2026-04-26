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
            List<Customer> customersToSave = new ArrayList<>();

            for(Row row : sheet){
                if(row.getRowNum() == 0) continue;
                String name = row.getCell(0).toString();
                var dob = row.getCell(1).getLocalDateTimeCellValue().toLocalDate();
                
                Cell nicCell = row.getCell(2);
                String nic;

                if(nicCell.getCellType() == CellType.NUMERIC){
                    nic = String.valueOf((long) nicCell.getNumericCellValue());
                } else{

                    nic = nicCell.getStringCellValue();
                }
                Customer customer = repo.findByNic(nic).orElse(new Customer());
                customer.setName(name);
                customer.setDateOfBirth(dob);
                customer.setNic(nic);
                customersToSave.add(customer);
            

            }
            for(int i =0; i < customersToSave.size();i +=100){
                repo.saveAll(customersToSave.subList(i, Math.min(i + 100, customersToSave.size())));
            }

        } catch (Exception e){
            throw new RuntimeException("Excel upload Failed: " + e.getMessage());
        }
    }
    
}
