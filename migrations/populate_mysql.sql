-- Crear la tabla Students
CREATE TABLE IF NOT EXISTS Students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

-- Crear la tabla Attendances
CREATE TABLE IF NOT EXISTS Attendances (
  id INT AUTO_INCREMENT PRIMARY KEY,
  studentId INT NOT NULL,
  className VARCHAR(255) NOT NULL,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar datos en Students
INSERT INTO Students (name) VALUES 
('Carlo Ramirez'), 
('David Araya');

-- Insertar datos en Attendances
INSERT INTO Attendances (studentId, className) VALUES 
(1, 'Matematicas'),
(2, 'Historia'),
(1, 'Ciencias'),
(2, 'Fisica');
