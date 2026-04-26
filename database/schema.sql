CREATE TABLE customer(
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    date_of_birth DATE NOT NULL,
    nic VARCHAR(50) NOT NULL UNIQUE
);
CREATE TABLE customer_mobile_numbers(
    customer_id BIGINT,
    mobile_numbers VARCHAR(20),
    FOREIGN KEY (customer_id) REFERENCES customer(id) ON DELETE CASCADE
);
CREATE TABLE customer_family_members(
    customer_id BIGINT,
    family_members_id BIGINT,
    FOREIGN KEY (customer_id) REFERENCES customer(id) ON DELETE CASCADE,
    FOREIGN KEY (family_members_id) REFERENCES customer(id) ON DELETE CASCADE
);
