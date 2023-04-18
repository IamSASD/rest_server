CREATE DATABASE rest_server;

CREATE TABLE user_table(
    id UUID PRIMARY KEY NOT NULL,
    name VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(20) NOT NULL,
    img TEXT,
    role VARCHAR(10) NOT NULL,
    status BOOLEAN NOT NULL DEFAULT true,
    google BOOLEAN NOT NULL DEFAULT false 
);

CREATE UNIQUE INDEX user_email_key ON user_table (email);

ALTER TABLE user_table ADD CONSTRAINT role_name CHECK (role IN ('ADMIN_ROLE', 'USER_ROLE'));