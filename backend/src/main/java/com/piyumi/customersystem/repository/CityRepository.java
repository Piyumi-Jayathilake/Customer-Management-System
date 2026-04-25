package com.piyumi.customersystem.repository;

import com.piyumi.customersystem.model.City;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CityRepository extends JpaRepository<City, Long> {
    
}
