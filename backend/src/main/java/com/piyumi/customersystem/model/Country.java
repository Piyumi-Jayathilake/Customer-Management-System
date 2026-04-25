package com.piyumi.customersystem.model;

import jakarta.persistence.*;
import lombok.Data;
@Entity
@Data

public class Country {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
}
