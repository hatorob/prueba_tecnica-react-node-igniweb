

CREATE DATABASE tasks_prueba;

CREATE TABLE tasks(
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255) DEFAULT NULL,
    completed BOOLEAN DEFAULT false
);

INSERT INTO tasks (title, description) VALUES
("Hacer api","se debe hacer una apiRest sencilla con express");