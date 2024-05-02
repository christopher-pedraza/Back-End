import express from "express";
import { config } from "../config.js";
import Database from "../database.js";

const router = express.Router();
router.use(express.json());

// Create database object
const database = new Database(config);

/**
 * @openapi
 * /experiencias:
 *  get:
 *    summary: Obtiene todas las experiencias
 *    tags:
 *     - Experiencias
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  idExperiencia:
 *                    type: integer
 *                  idUF:
 *                    type: integer
 *                    nullable: true
 *                  idSala:
 *                    type: integer
 *                  nombre:
 *                    type: string
 *                  descripcion:
 *                    type: string
 *                  esAutoDirigida:
 *                    type: boolean
 *                  esExclusivaUF:
 *                    type: boolean
 *                  portadaURL:
 *                    type: string
 *                  fechaInicio:
 *                    type: string
 *                    format: date-time
 *                  fechaFin:
 *                    type: string
 *                    format: date-time
 *                  horaFin:
 *                    type: string
 *                    format: date-time
 *      500:
 *        description: Error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 */
router.get("/", async (_, res) => {
    try {
        // Regresa todas las experiencias
        const experiencias = await database.readAll("Experiencias");
        res.status(200).json(experiencias);
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
});

/**
 * @openapi
 * /experiencias/autodirigidas:
 *  get:
 *    summary: Obtiene todas las experiencias autodirigidas
 *    tags:
 *     - Experiencias
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  idExperiencia:
 *                    type: integer
 *                  idUF:
 *                    type: integer
 *                    nullable: true
 *                  idSala:
 *                    type: integer
 *                  nombre:
 *                    type: string
 *                  descripcion:
 *                    type: string
 *                  esAutoDirigida:
 *                    type: boolean
 *                  esExclusivaUF:
 *                    type: boolean
 *                  portadaURL:
 *                    type: string
 *                  fechaInicio:
 *                    type: string
 *                    format: date-time
 *                  fechaFin:
 *                    type: string
 *                    format: date-time
 *                  horaFin:
 *                    type: string
 *                    format: date-time
 *      500:
 *        description: Error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 */
router.get("/autodirigidas", async (_, res) => {
    try {
        // Leer todas las experiencias de la base de datos
        const experiencias = await database.readAll("Experiencias");
        // Filtrar las experiencias para obtener solo las autodirigidas
        const experienciasAutodirigidas = experiencias.filter(
            (experiencia) => experiencia.esAutoDirigida == 1
        );
        res.status(200).json(experienciasAutodirigidas);
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
});

/**
 * @openapi
 * /experiencias/{id}:
 *  get:
 *    summary: Obtiene una experiencia por su ID
 *    tags:
 *     - Experiencias
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: integer
 *       required: true
 *       description: ID de la experiencia
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  idExperiencia:
 *                    type: integer
 *                  idUF:
 *                    type: integer
 *                    nullable: true
 *                  idSala:
 *                    type: integer
 *                  nombre:
 *                    type: string
 *                  descripcion:
 *                    type: string
 *                  esAutoDirigida:
 *                    type: boolean
 *                  esExclusivaUF:
 *                    type: boolean
 *                  portadaURL:
 *                    type: string
 *                  fechaInicio:
 *                    type: string
 *                    format: date-time
 *                  fechaFin:
 *                    type: string
 *                    format: date-time
 *                  horaFin:
 *                    type: string
 *                    format: date-time
 *      404:
 *        description: Not Found
 *      500:
 *        description: Error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 */
router.get("/:id", async (req, res) => {
    try {
        const experienciaId = req.params.id;
        if (experienciaId) {
            const result = await database.executeQuery(
                `EXEC [dbo].[getExperienciaById] @idExperiencia = ${experienciaId};`
            );
            res.status(200).json(result.recordset);
        } else {
            res.status(404);
        }
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
});

/**
 * @openapi
 * /experiencias/UFs:
 *  post:
 *    summary: Obtiene las experiencias de las UFs de un usuario
 *    tags:
 *     - Experiencias
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              user:
 *                type: string
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  idExperiencia:
 *                    type: integer
 *                  idUF:
 *                    type: integer
 *                    nullable: true
 *                  idSala:
 *                    type: integer
 *                  nombre:
 *                    type: string
 *                  descripcion:
 *                    type: string
 *                  esAutoDirigida:
 *                    type: boolean
 *                  esExclusivaUF:
 *                    type: boolean
 *                  portadaURL:
 *                    type: string
 *                  fechaInicio:
 *                    type: string
 *                    format: date-time
 *                  fechaFin:
 *                    type: string
 *                    format: date-time
 *                  horaFin:
 *                    type: string
 *                    format: date-time
 *      500:
 *        description: Error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 */
router.post("/UFs", async (req, res) => {
    try {
        // Obtener el usuario enviado como parámetro desde la solicitud
        const userId = req.body.user; // Obtenemos el user
        const grupos = await database.readAll("GruposUsuarios");
        const ufsUsuario = grupos.filter((grupo) => grupo.idUsuario == userId);
        const expUFs = await database.readAll("Experiencias");
        const expUFsUsuario = expUFs.filter(
            (expUF) => expUF.idUF == ufsUsuario[0].idUF
        );

        res.status(200).json(expUFsUsuario);
    } catch (err) {
        res.status(500).json({ error: err?.message });
    }
});

export default router;
