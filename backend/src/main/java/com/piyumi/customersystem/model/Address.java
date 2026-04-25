package com.piyumi.customersystem.model;

import jakarta.persistence.*;
import lombok.Data;
@Entity
@Data

public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String lane1;
    private String lane2;

    @ManyToOne
    private City city;
}
