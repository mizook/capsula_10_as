CREATE TABLE IF NOT EXISTS Students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Attendances (
    id SERIAL PRIMARY KEY,
    studentId INT NOT NULL,
    className VARCHAR(255) NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (studentId) REFERENCES Students(id)
);

INSERT INTO Students (name) VALUES ('Carlo Ramirez'), ('David Araya');

INSERT INTO Attendances (studentId, className) VALUES (1, 'Math'), (2, 'Math');