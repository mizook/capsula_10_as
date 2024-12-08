import express from "express";
import AttendanceModel from "../models/attendance.model.js";

import { postgres, mysql } from "../config/db.js";

const PROD_DB = "psql";

const psql_model = AttendanceModel(postgres);
const mysql_model = AttendanceModel(mysql);

const read_db = PROD_DB === "psql" ? psql_model : mysql_model;

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Attendance
 *   description: Endpoints relacionados con asistencias
 */

/**
 * @swagger
 * /attendance:
 *   get:
 *     tags: [Attendance]
 *     summary: Obtiene todas las asistencias
 *     description: Obtiene una lista de todas las asistencias registradas
 *     responses:
 *       200:
 *         description: Lista de todas las asistencias
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID de la asistencia
 *                   studentId:
 *                     type: integer
 *                     description: ID del estudiante que asistió
 *                   className:
 *                     type: string
 *                     description: Nombre de la clase
 *                   date:
 *                     type: string
 *                     format: date-time
 *                     description: Fecha y hora de la asistencia
 */
router.get("/", async (req, res) => {
  try {
    const attendances = await read_db.findAll();
    res.status(200).json(attendances);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error obteniendo asistencias", details: error.message });
  }
});

/**
 * @swagger
 * /attendance:
 *   post:
 *     tags: [Attendance]
 *     summary: Crea una nueva asistencia
 *     description: Registra una nueva asistencia en ambas bases de datos con consistencia
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               studentId:
 *                 type: integer
 *                 description: ID del estudiante
 *               className:
 *                 type: string
 *                 description: Nombre de la clase
 *     responses:
 *       201:
 *         description: Asistencia creada con éxito
 */
router.post("/", async (req, res) => {
  const { studentId, className } = req.body;

  const transaction_psql = await postgres.transaction();
  const transaction_mysql = await mysql.transaction();

  try {
    const attendance_psql = await psql_model.create(
      { studentId, className },
      { transaction: transaction_psql }
    );

    const attendance_mysql = await mysql_model.create(
      { studentId, className },
      { transaction: transaction_mysql }
    );

    await transaction_psql.commit();
    await transaction_mysql.commit();

    res.status(201).json({
      postgres: attendance_psql,
      mysql: attendance_mysql,
    });
  } catch (error) {
    await transaction_psql.rollback();
    await transaction_mysql.rollback();

    res.status(500).json({
      error: "Error creando asistencia",
      details: error.message,
    });
  }
});

export default router;
