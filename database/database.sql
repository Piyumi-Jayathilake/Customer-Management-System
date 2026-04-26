CREATE DATABASE customer_db;
USE customer_db;
CREATE TABLE customer(
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    date_of_birth DATE NOT NULL,
    nic VARCHAR(20) UNIQUE NOT NULL
);
CREATE TABLE customer_mobile_numbers(
    customer_id BIGINT,
    mobile_number VARCHAR(20),
    FOREIGN KEY (customer_id) REFERENCES customer(id) ON DELETE CASCADE
);
CREATE TABLE country(
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100)
);
CREATE TABLE city(
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    country_id BIGINT,
    FOREIGN KEY (country_id) REFERENCES country(id)
);
CREATE TABLE address(
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    lane1 VARCHAR(255),
    lane2 VARCHAR(255),
    city_id BIGINT,
    FOREIGN KEY (city_id) REFERENCES city(id)
);
CREATE TABLE customer_addresses(
    customer_id BIGINT,
    address_id BIGINT,
    FOREIGN KEY (customer_id) REFERENCES customer(id) ON DELETE CASCADE,
    FOREIGN KEY (address_id) REFERENCES address(id) ON DELETE CASCADE
);
CREATE TABLE customer_family_members(
    customer_id BIGINT,
    family_members_id BIGINT,
    FOREIGN KEY (customer_id) REFERENCES customer(id) ON DELETE CASCADE,
    FOREIGN KEY (family_members_id) REFERENCES customer(id) ON DELETE CASCADE
);

-- Insert sample data
INSERT INTO country (name) VALUES ('USA'), ('Canada'), ('UK');  
INSERT INTO city (name, country_id) VALUES ('New York', 1), ('Los Angeles', 1), ('Toronto', 2), ('Vancouver', 2), ('London', 3), ('Manchester', 3);