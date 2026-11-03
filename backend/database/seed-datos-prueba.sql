INSERT INTO usuarios (documento, apellidos, nombres, email, clave, estado, rol) VALUES
('8000', 'Administradora', 'Prueba', 'administradora.prueba@clinica.test', '$2b$10$lpXUysGHZuyV7eL35XCSZuisbKXZ3MYBJvHtf/zJlmPiG8AG1Iasm', 'ACTIVO', 'ADMINISTRADOR'),
('8100', 'Medico', 'Prueba Uno', 'medico.uno@clinica.test', '$2b$10$lpXUysGHZuyV7eL35XCSZuisbKXZ3MYBJvHtf/zJlmPiG8AG1Iasm', 'ACTIVO', 'MEDICO'),
('8101', 'Medico', 'Prueba Dos', 'medico.dos@clinica.test', '$2b$10$lpXUysGHZuyV7eL35XCSZuisbKXZ3MYBJvHtf/zJlmPiG8AG1Iasm', 'ACTIVO', 'MEDICO'),
('8200', 'Paciente', 'Prueba Uno', 'paciente.uno@clinica.test', '$2b$10$lpXUysGHZuyV7eL35XCSZuisbKXZ3MYBJvHtf/zJlmPiG8AG1Iasm', 'ACTIVO', 'PACIENTE'),
('8201', 'Paciente', 'Prueba Dos', 'paciente.dos@clinica.test', '$2b$10$lpXUysGHZuyV7eL35XCSZuisbKXZ3MYBJvHtf/zJlmPiG8AG1Iasm', 'ACTIVO', 'PACIENTE'),
('8202', 'Paciente', 'Prueba Tres', 'paciente.tres@clinica.test', '$2b$10$lpXUysGHZuyV7eL35XCSZuisbKXZ3MYBJvHtf/zJlmPiG8AG1Iasm', 'ACTIVO', 'PACIENTE')
ON CONFLICT (documento) DO NOTHING;

INSERT INTO medicos (id_usuario, matricula, valor_consulta)
SELECT usuarios.id, medicosDePrueba.matricula, medicosDePrueba.valor_consulta
FROM (VALUES
    ('8100', 810001, 15000),
    ('8101', 810002, 20000)
) AS medicosDePrueba (documento, matricula, valor_consulta)
JOIN usuarios ON usuarios.documento = medicosDePrueba.documento
WHERE NOT EXISTS (
    SELECT 1 FROM medicos WHERE medicos.id_usuario = usuarios.id
);

INSERT INTO reservas (id_medico, id_paciente, fecha_hora, estado, valor_consulta)
SELECT medicos.id, pacientes.id, reservasDePrueba.fecha_hora, reservasDePrueba.estado::estados_reservas, medicos.valor_consulta
FROM (VALUES
    ('8100', '8200', CURRENT_DATE - 3 + TIME '09:00', 'ATENDIDO'),
    ('8100', '8201', CURRENT_DATE - 2 + TIME '10:00', 'AUSENTE'),
    ('8100', '8200', CURRENT_DATE + TIME '15:00', 'ACTIVO'),
    ('8100', '8201', CURRENT_DATE + 3 + TIME '09:00', 'ACTIVO'),
    ('8101', '8202', CURRENT_DATE + 3 + TIME '10:00', 'ACTIVO'),
    ('8101', '8200', CURRENT_DATE + 5 + TIME '11:00', 'ACTIVO'),
    ('8100', '8202', CURRENT_DATE + 4 + TIME '14:00', 'CANCELADO')
) AS reservasDePrueba (documento_medico, documento_paciente, fecha_hora, estado)
JOIN usuarios AS usuariosMedicos ON usuariosMedicos.documento = reservasDePrueba.documento_medico
JOIN medicos ON medicos.id_usuario = usuariosMedicos.id
JOIN usuarios AS pacientes ON pacientes.documento = reservasDePrueba.documento_paciente
WHERE NOT EXISTS (
    SELECT 1 FROM reservas
    WHERE reservas.id_medico = medicos.id
    AND reservas.fecha_hora = reservasDePrueba.fecha_hora
);
