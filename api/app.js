import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import express from "express";
import studentRoutes from "./routes/student.routes.js";
import attendanceRoutes from "./routes/attendance.routes.js";

const app = express();
app.use(express.json());

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Estudiantes",
      version: "1.0.0",
      description: "Documentación de la API de Estudiantes y Asistencias",
    },
    tags: [
      {
        name: "Students",
        description: "Endpoints relacionados con estudiantes",
      },
      {
        name: "Attendance",
        description: "Endpoints relacionados con asistencias",
      },
    ],
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./api/routes/*.js"],
});

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/students", studentRoutes);
app.use("/attendance", attendanceRoutes);

export default app;
