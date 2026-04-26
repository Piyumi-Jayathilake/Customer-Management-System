package com.piyumi.customersystem;
import com.piyumi.customersystem.model.Customer;
import com.piyumi.customersystem.repository.CustomerRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
public class CustomerServiceTest {
    @Autowired
    private CustomerRepository repo;

    @Test
    void testCreateCustomer() {
        Customer c = new Customer();
        c.setName("Piyumi Jayathilake");
        c.setNic("200213456987");
        c.setDateOfBirth(LocalDate.of(1990, 1, 1));

        Customer saved= repo.save(c);

        assertNotNull(saved.getId());
    }
    @Test
    void testFindByNic() {
        Customer c = new Customer();
        c.setName("Find Test");
        c.setNic("200256464646");
        c.setDateOfBirth(LocalDate.now());

        repo.save(c);

        Customer found = repo.findByNic("200256464646").orElse(null);
        assertNotNull(found);
        assertEquals("Find Test", found.getName());
    }
}
