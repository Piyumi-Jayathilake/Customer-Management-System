package com.piyumi.customersystem.repository;

import com.piyumi.customersystem.model.Country;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CountryRepository extends JpaRepository<Country, Long> {
    
}
