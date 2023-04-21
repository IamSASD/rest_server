CREATE DATABASE rest_server;

CREATE TABLE roles(
    id UUID PRIMARY KEY NOT NULL,
    role_name VARCHAR(15)
);

CREATE UNIQUE INDEX roles_key ON roles (role_name);

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

INSERT INTO roles(id, role_name) VALUES(uuid_generate_v4(), 'ADMIN_ROLE');
INSERT INTO roles(id, role_name) VALUES(uuid_generate_v4(), 'USER_ROLE');

CREATE TABLE user_table(
    id UUID PRIMARY KEY NOT NULL,
    name VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(70) NOT NULL,
    img TEXT,
    role UUID NOT NULL REFERENCES roles(id),
    status BOOLEAN NOT NULL DEFAULT true,
    google BOOLEAN NOT NULL DEFAULT false 
);

CREATE UNIQUE INDEX user_email_key ON user_table (email);





