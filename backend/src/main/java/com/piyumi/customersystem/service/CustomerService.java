package com.piyumi.customersystem.service;

import com.piyumi.customersystem.model.Customer;
import com.piyumi.customersystem.repository.CustomerRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService {

    private final CustomerRepository repo;
    public CustomerService(CustomerRepository repo) {
        this.repo = repo;
    }
    public Customer create(Customer customer) {
        return repo.save(customer);
    }
    public List<Customer> getAll(){
        return repo.findAll();
    }

    public Customer getById(Long id){
    return repo.findById(id)
            .orElseThrow(() -> new RuntimeException("customer not found"));
    }
    public Customer update(Long id, Customer updatedCustomer){
        Customer existing = getById(id);
        existing.setName(updatedCustomer.getName());
        existing.setDateOfBirth(updatedCustomer.getDateOfBirth());
        existing.setNic(updatedCustomer.getNic());

        existing.setFamilyMembers(updatedCustomer.getFamilyMembers());

        return repo.save(existing);
    }

    public void delete(Long id){
        repo.deleteById(id);
    }

    
}

