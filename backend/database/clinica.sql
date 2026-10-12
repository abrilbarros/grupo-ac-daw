CREATE TYPE estados_usuarios AS ENUM ('ACTIVO','BAJA');
CREATE TYPE roles_usuarios AS ENUM ('MEDICO','PACIENTE','ADMINISTRADOR');
CREATE TYPE estados_reservas AS ENUM ('ACTIVO','ATENDIDO','AUSENTE','CANCELADO');

CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    documento TEXT NOT NULL UNIQUE,
    apellidos TEXT NOT NULL,
    nombres TEXT NOT NULL,
    email TEXT NOT NULL,
    clave TEXT NOT NULL,
    estado estados_usuarios NOT NULL,
    rol roles_usuarios NOT NULL
);

CREATE TABLE medicos (
    id SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL,
    matricula INT NOT NULL,
    valor_consulta INT NOT NULL,
    CONSTRAINT fk_medicos_usuario
        FOREIGN KEY (id_usuario)
        REFERENCES usuarios (id)
);

CREATE TABLE reservas (
    id SERIAL PRIMARY KEY,
    id_medico INT NOT NULL,
    id_paciente INT NOT NULL,
    fecha_hora TIMESTAMP NOT NULL,
    estado estados_reservas NOT NULL,
    valor_consulta INT NOT NULL,
    CONSTRAINT fk_reservas_medico
        FOREIGN KEY (id_medico)
        REFERENCES medicos (id),
    CONSTRAINT fk_reservas_paciente
        FOREIGN KEY (id_paciente)
        REFERENCES usuarios (id)
);

INSERT INTO usuarios (documento, apellidos, nombres, email, clave, estado, rol) VALUES
('1000', 'Gomez', 'Laura', 'laura.gomez@clinica.com', '$2b$10$nkPUafFtZtZm3u2gZBBYuexAQ2FjeSgzS11zLYjHlV5XW3bPa2Whi', 'ACTIVO', 'ADMINISTRADOR'),
('2000', 'Perez', 'Martin', 'martin.perez@clinica.com', '$2b$10$nkPUafFtZtZm3u2gZBBYuexAQ2FjeSgzS11zLYjHlV5XW3bPa2Whi', 'ACTIVO', 'MEDICO'),
('2001', 'Lopez', 'Ana', 'ana.lopez@clinica.com', '$2b$10$nkPUafFtZtZm3u2gZBBYuexAQ2FjeSgzS11zLYjHlV5XW3bPa2Whi', 'ACTIVO', 'MEDICO'),
('3000', 'Diaz', 'Sofia', 'sofia.diaz@mail.com', '$2b$10$nkPUafFtZtZm3u2gZBBYuexAQ2FjeSgzS11zLYjHlV5XW3bPa2Whi', 'ACTIVO', 'PACIENTE'),
('3001', 'Romero', 'Juan', 'juan.romero@mail.com', '$2b$10$nkPUafFtZtZm3u2gZBBYuexAQ2FjeSgzS11zLYjHlV5XW3bPa2Whi', 'ACTIVO', 'PACIENTE'),
('3002', 'Sosa', 'Lucia', 'lucia.sosa@mail.com', '$2b$10$nkPUafFtZtZm3u2gZBBYuexAQ2FjeSgzS11zLYjHlV5XW3bPa2Whi', 'ACTIVO', 'PACIENTE'),
('2002', 'Gomez', 'Laura', 'laura.gomez.medico@clinica.com', '$2b$10$nkPUafFtZtZm3u2gZBBYuexAQ2FjeSgzS11zLYjHlV5XW3bPa2Whi', 'ACTIVO', 'MEDICO'),
('2003', 'Fernandez', 'Diego', 'diego.fernandez@clinica.com', '$2b$10$nkPUafFtZtZm3u2gZBBYuexAQ2FjeSgzS11zLYjHlV5XW3bPa2Whi', 'ACTIVO', 'MEDICO'),
('2004', 'Ruiz', 'Marina', 'marina.ruiz@clinica.com', '$2b$10$nkPUafFtZtZm3u2gZBBYuexAQ2FjeSgzS11zLYjHlV5XW3bPa2Whi', 'ACTIVO', 'MEDICO'),
('3003', 'Perez', 'Juan', 'juan.perez@mail.com', '$2b$10$nkPUafFtZtZm3u2gZBBYuexAQ2FjeSgzS11zLYjHlV5XW3bPa2Whi', 'ACTIVO', 'PACIENTE'),
('3004', 'Lopez', 'Sofia', 'sofia.lopez@mail.com', '$2b$10$nkPUafFtZtZm3u2gZBBYuexAQ2FjeSgzS11zLYjHlV5XW3bPa2Whi', 'ACTIVO', 'PACIENTE'),
('3005', 'Martinez', 'Carlos', 'carlos.martinez@mail.com', '$2b$10$nkPUafFtZtZm3u2gZBBYuexAQ2FjeSgzS11zLYjHlV5XW3bPa2Whi', 'ACTIVO', 'PACIENTE'),
('3006', 'Diaz', 'Valentina', 'valentina.diaz@mail.com', '$2b$10$nkPUafFtZtZm3u2gZBBYuexAQ2FjeSgzS11zLYjHlV5XW3bPa2Whi', 'ACTIVO', 'PACIENTE'),
('3007', 'Sosa', 'Roberto', 'roberto.sosa@mail.com', '$2b$10$nkPUafFtZtZm3u2gZBBYuexAQ2FjeSgzS11zLYjHlV5XW3bPa2Whi', 'BAJA', 'PACIENTE'),
('1001', 'Acosta', 'Paula', 'paula.acosta@clinica.com', '$2b$10$nkPUafFtZtZm3u2gZBBYuexAQ2FjeSgzS11zLYjHlV5XW3bPa2Whi', 'ACTIVO', 'ADMINISTRADOR'),
('2005', 'Herrera', 'Nicolas', 'nicolas.herrera@clinica.com', '$2b$10$nkPUafFtZtZm3u2gZBBYuexAQ2FjeSgzS11zLYjHlV5XW3bPa2Whi', 'BAJA', 'MEDICO');

INSERT INTO medicos (id_usuario, matricula, valor_consulta) VALUES
(2, 12345, 15000),
(3, 23456, 18000),
(7, 100234, 15000),
(8, 100987, 18000),
(9, 101456, 20000),
(16, 99012, 12000);

-- RESERVAS DE PRUEBA

INSERT INTO reservas
(id_medico, id_paciente, fecha_hora, estado, valor_consulta)
VALUES

-- Reservas historicas
(3, 10, '2026-09-25 09:00:00', 'ATENDIDO', 14000),
(3, 11, '2026-09-25 10:00:00', 'AUSENTE', 14000),
(4, 12, '2026-09-28 14:00:00', 'CANCELADO', 17000),

-- Reservas futuras
(3, 12, '2026-11-15 08:00:00', 'ACTIVO', 15000),
(3, 13, '2026-11-15 11:00:00', 'ACTIVO', 15000),
(4, 10, '2026-11-16 09:00:00', 'ACTIVO', 18000),
(5, 11, '2026-11-19 15:00:00', 'ACTIVO', 20000),
(3, 11, '2026-11-20 13:00:00', 'ACTIVO', 15000),
(4, 13, '2026-11-21 10:00:00', 'ACTIVO', 18000),
(5, 12, '2026-11-22 12:00:00', 'ACTIVO', 20000);