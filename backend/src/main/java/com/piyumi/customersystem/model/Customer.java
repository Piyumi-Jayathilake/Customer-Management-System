package com.piyumi.customersystem.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;
import java.util.ArrayList;

@Entity
@Data

public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Name is required")
    private String name;

    @NotNull(message = "DOB is required")
    private LocalDate dateOfBirth;

    @NotNull(message = "NIC is required")
    @Column(unique = true)
    private String nic;

    @ElementCollection
    @CollectionTable(name = "customer_mobile_numbers",
     joinColumns = @JoinColumn(name = "customer_id"))
     @Column(name = "mobile_number")
    private List<String> mobileNumbers = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL)
    private List<Address> addresses = new ArrayList<>();

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "customer_family",
            joinColumns = @JoinColumn(name = "customer_id"),
            inverseJoinColumns = @JoinColumn(name = "family_member_id")
    )
    private List<Customer> familyMembers = new ArrayList<>();


}
