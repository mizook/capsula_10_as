# 📘 **Cápsula 10 - Arquitectura de Sistemas**

Este proyecto es una **API REST** que usa **Node.js**, **PostgreSQL**, **MySQL** y un **script en Python** para crear registros de estudiantes y asistencias.

---

## 📦 **1. Requisitos previos**

- **Node.js** (v20+), **PostgreSQL**, **MySQL**, **Python (v3.12)+**

---

## ⚙️ **2. Configuración inicial**

### Clonar el repositorio

```
git clone https://github.com/mizook/capsula_10_as.git
cd capsula_10_as
```

### Instalar dependencias

```
npm install
```

### Configurar bases de datos

Abre la terminal en la raíz del proyecto.

#### PostgreSQL

```
psql -U postgres
password
CREATE DATABASE postgres_db;
\c postgres_db
\i migrations/populate_postgres.sql
```

Abre la terminal en la raíz del proyecto.

#### MySQL

```
mysql -u root -p
password
CREATE DATABASE mysql_db;
USE mysql_db;
source migrations/populate_mysql.sql;
```

---

## 🚀 **3. Levantar la API**

### Seleccionar la base de lectura

### En student.routes.js y attendance.routes.js cambia la constante:

```
const PROD_DB = "psql"; // O cambia a "mysql"
```

### Iniciar la API

```
npm run dev
```

#### La API estará disponible en http://localhost:3000

#### Swagger estará disponible en http://localhost:3000/swagger

---

## 📋 **4. Endpoints disponibles**

### Endpoints disponibles

```
GET /students - Obtiene todos los estudiantes de la "PROD_DB"
POST /students - Crea un nuevo estudiante en ambas DB
GET /attendance - Obtiene todas las asistencias de la "PROD_DB"
POST /attendance - Crea una nueva asistencia en ambas DB
```

---

## 🔥 **5. Script de Python**

El script de Python registra asistencias cada **10 segundos** automáticamente.

### Crear el entorno virtual

```

python -m venv venv
source venv/bin/activate # Windows: venv\Scriptsctivate

```

### Instalar dependencias de Python

```

pip install requests

```

### Ejecutar el script de Python

```

python attendance_script.py

```

El script enviará asistencias de forma automática cada 10 segundos a la API.

---

## 📋 **6. Configuración del script de Python**

Variables configurables en attendance_script.py

### URL de la API

```
API_URL = "http://localhost:3000/attendance"
```

### Configuración del tiempo entre peticiones (en segundos)

```
REQUEST_INTERVAL = 10
```

### Lista de nombres de clases

```
CLASS_NAMES = [
    "Matematicas",
    "Historia",
    "Ciencias",
    "Fisica",
    "Quimica",
    "Biologia",
    "Geografia",
    "Ingles",
    "Programacion",
    "Musica",
    "Arte",
    "Educacion Fisica",
    "Etica",
    "Filosofia",
    "Lenguaje",
    "Literatura",
    "Robotica",
    "Astronomia",
    "Inteligencia Artificial",
    "Data Science"
]
```

### Lista de studentId de ejemplo

```
STUDENT_IDS = [1, 2]
```

---
