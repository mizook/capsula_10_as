import express from "express";
import StudentModel from "../models/student.model.js";

import { postgres, mysql } from "../config/db.js";

const psql_model = StudentModel(postgres);
const mysql_model = StudentModel(mysql);

const PROD_DB = psql_model;

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Students
 *   description: Endpoints relacionados con estudiantes
 */

/**
 * @swagger
 * /students:
 *   get:
 *     tags: [Students]
 *     summary: Obtiene todos los estudiantes
 *     description: Obtiene una lista de todos los estudiantes registrados
 *     responses:
 *       200:
 *         description: Lista de todos los estudiantes
 */
router.get("/", async (req, res) => {
  try {
    const students = await PROD_DB.findAll();
    res.status(200).json(students);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error obteniendo estudiantes", details: error.message });
  }
});

/**
 * @swagger
 * /students:
 *   post:
 *     tags: [Students]
 *     summary: Crea un nuevo estudiante
 *     description: Crea un nuevo estudiante en ambas bases de datos con consistencia
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del estudiante
 *                 example: Juan Pérez
 *     responses:
 *       201:
 *         description: Estudiante creado con éxito
 */
router.post("/", async (req, res) => {
  const { name } = req.body;

  const transaction_psql = await postgres.transaction();
  const transaction_mysql = await mysql.transaction();

  try {
    const student_psql = await psql_model.create(
      { name },
      { transaction: transaction_psql }
    );

    const student_mysql = await mysql_model.create(
      { name },
      { transaction: transaction_mysql }
    );

    await transaction_psql.commit();
    await transaction_mysql.commit();

    res.status(201).json({ postgres: student_psql, mysql: student_mysql });
  } catch (error) {
    await transaction_psql.rollback();
    await transaction_mysql.rollback();

    res.status(500).json({
      error: "Error creando estudiante",
      details: error.message,
    });
  }
});

export default router;
