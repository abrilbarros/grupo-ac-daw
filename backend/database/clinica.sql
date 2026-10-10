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
('3002', 'Sosa', 'Lucia', 'lucia.sosa@mail.com', '$2b$10$nkPUafFtZtZm3u2gZBBYuexAQ2FjeSgzS11zLYjHlV5XW3bPa2Whi', 'ACTIVO', 'PACIENTE');

INSERT INTO medicos (id_usuario, matricula, valor_consulta) VALUES
(2, 12345, 15000),
(3, 23456, 18000);
